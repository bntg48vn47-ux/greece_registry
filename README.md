# Greece Registry

Static website (GitHub Pages) + Supabase (accounts, database, photo storage).

Files: `index.html`, `style.css`, `app.js`, `config.js`, `schema.sql`.

## 1. Supabase
1. Create a project at supabase.com.
2. **SQL Editor > New query**: paste all of `schema.sql` and run it.
3. **Project Settings > API**: copy the Project URL and the `anon` public key into `config.js`.
4. **Authentication > URL Configuration**: set Site URL to your site address (e.g. `https://YOUR-USER.github.io/greece-registry/`, later `https://greeceregistry.com`).
5. **Authentication > Providers > Email**: leave "Confirm email" on for a real launch. Turn it off only while testing.

## 2. First admin
Open the site, create your account (username + country), then run in the SQL Editor:
```sql
update public.profiles set role = 'admin' where lower(username) = lower('YOUR_USERNAME');
```
Reload the site. An **Admin** link appears in the menu.

## 3. GitHub Pages
1. Create a repo and upload all files in this folder to the root (do not add secret keys).
2. **Settings > Pages**: Source = Deploy from a branch, branch `main`, folder `/ (root)`.
3. Optional: add your custom domain in the same page.

## How it works
- Sign up needs username, country, email and password. Usernames are unique (case-insensitive).
- New cars are `pending`. Admins approve or reject them in **Admin > Cars**. Admin-added cars are approved at once.
- Max 10 photos per car (checked in the browser and by the database). Photos go to the `car-photos` bucket.
- Only the first 3 plate letters are stored, never the numbers.
- Admins can delete cars (photos too), ban/unban users and promote/demote admins in **Admin > Users**.
- Set `REQUIRE_LOGIN: false` and uncomment the `anon` policy in `schema.sql` to let anyone browse without an account.

## Before going live
- Have a Greek lawyer write the privacy policy, terms and cookie policy (replace the placeholder on the Legal page). You store emails, usernames and countries, so GDPR applies.
- Keep the removal-request process working: owners can ask for their car to be removed.
- Photo links are public once uploaded (even for pending cars), though file names are random and unguessable.
