#!/usr/bin/env ruby

# Upload the files to the FTP server (ksadebiekorf.be)
# env variables:
# CPANEL_USER
# CPANEL_PASS
# Usage: CPANEL_USER=USER CPANEL_PASS=PASS ruby upload.rb

require 'net/ftp'

Dir.chdir(__dir__) # change dir to source file directory

ROOT_FOLDER = "~/public_html/email"

ftp = Net::FTP.new
ftp.connect('ftp.ksadebiekorf.be', 21)
ftp.login(ENV["CPANEL_USER"], ENV["CPANEL_PASS"])
ftp.chdir(ROOT_FOLDER)

# Empty exising directory (!!)

# Read all files in a directory in a remote ftp server
# ftp = ftp conn
# dir = nil => current directory
def readFilesInDir(ftp, dir)
    files = ftp.list(dir)

    reg = /^(?<type>.{1})(?<mode>\S+)\s+(?<number>\d+)\s+(?<owner>\S+)\s+(?<group>\S+)\s+(?<size>\d+)\s+(?<mod_time>.{12})\s+(?<path>.+)$/

    filesList = []

    files.each do |file|
        match = file.match(reg)
        if match[:type] == "d"
            # dir
            if match[:path] != "." && match[:path] != ".."
                readFilesInDir(ftp, match[:path]).each do |fileInDir|
                    filesList.append(match[:path] + "/" + fileInDir)
                end
            end
        else 
            # file
            filesList.append(match[:path])
        end
    end

    return filesList
end

# Read all dirs in ftp server
def listDirs(ftp, dir)
    dirs = ftp.list(dir)

    reg = /^(?<type>.{1})(?<mode>\S+)\s+(?<number>\d+)\s+(?<owner>\S+)\s+(?<group>\S+)\s+(?<size>\d+)\s+(?<mod_time>.{12})\s+(?<path>.+)$/

    dirList = []

    dirs.each do |dir|
        match = dir.match(reg)

        if match[:type] == "d"
            if match[:path] != "." && match[:path] != ".."
                listDirs(ftp, match[:path]).each do |dirInDir|
                    dirList.append(match[:path] + "/" + dirInDir)
                end
                dirList.append(match[:path])
            end
        end
    end

    return dirList
end

# List all files & remove
files = readFilesInDir(ftp, nil)

files.each do |file| 
    ftp.delete(file)
end

# List all dirs & remove
dirs = listDirs(ftp, nil)

dirs.each do |dir|
    begin
        ftp.rmdir(dir)
    rescue => error
        puts "Couldn't remove directory #{dir}: #{error.message}"
    end
end

# Copy new files to directory
Dir.chdir("../public") do 
    # Build project
    system "npm run build"

    files = []
    dirs = []
    Dir.glob("**/*") do |f|
        file = File.new(f)
        if File.file?(file)
            files << file
        else 
            # directory
            dirs << file
        end
    end

    dirs.each do |dir|
        begin
            ftp.mkdir(File.path(dir))
        rescue => error
            puts "Couldn't make directory #{File.path(dir)}: #{error.message}"
        end
    end

    files.each do |file|
        dirname = File.dirname(file)
        if dirname != "."
            ftp.chdir(dirname)
        end

        ftp.putbinaryfile(file, File.basename(file))

        ftp.chdir(ROOT_FOLDER)
    end
end

puts "All files copied"
