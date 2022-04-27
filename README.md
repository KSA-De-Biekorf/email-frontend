Email website KSA De Biekorf

Meer informatie over de werking in het draaiboek.

## Contributing

```
git clone https:/github.com/ksa-de-biekorf/email-frontend
cd email-frontend
npm i
npm i -g sass

# Start dev server
npm run dev
```

Pas geen bestanden aan in de `public` directory. Pas ze aan in `html` en `scss` en run `./build.sh`.

## TODO
- File attachements
- Upload to server CI (`./upload/upload.rb`)

# Uploaden naar ftp server
Om de website te bouwen en te uploaden naar de server:

```bash
CPANEL_USER={cPanel login} CPANEL_PASS={cPanel wachtwoord} ruby upload.rb
```

(c) KSA De Biekorf, Jonas Everaert 2022
