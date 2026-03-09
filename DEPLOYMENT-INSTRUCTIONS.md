# LUNA SEN Insurance – GitHub Pages deployment

Custom domain: **https://lunaseninsurance.co.uk**  
Contact email: **support@lunaseninsurance.co.uk**

---

## Branch setup

- **main** (or **master**) = where you edit. Changes here do **not** go live.
- **production** = branch that GitHub Pages deploys. Only this branch is live.

---

## 1. Create the production branch (one-time)

In your project folder (e.g. `LUNA-INSURANCE-master`), in a terminal:

```bash
# Make sure you're on main (or master) and everything is committed
git status

# Create a new branch called production from current branch
git branch production

# Push the production branch to GitHub
git push -u origin production
```

If your default branch is still **master** and you want **main** as the editing branch:

```bash
# Rename master to main locally
git branch -m master main

# Push main and set upstream
git push -u origin main

# Create production from main
git branch production
git push -u origin production
```

On GitHub: **Settings → General → Default branch** can be set to **main** (or leave **master**). The live site will use **production** only (see step 3).

---

## 2. Set GitHub Pages to use the production branch only

1. Open your repo: **github.com/lay162/LUNA-INSURANCE**
2. Go to **Settings → Pages**
3. Under **Build and deployment**:
   - **Source:** Deploy from a **branch**
   - **Branch:** choose **production** (not main/master)
   - **Folder:** **/ (root)**
4. Click **Save**
5. Under **Custom domain**, enter: **lunaseninsurance.co.uk**  
   When DNS is correct, tick **Enforce HTTPS**.

Only pushes to **production** will update the live site. Pushes to **main** (or **master**) do nothing to the live site.

---

## 3. How to update the live site only when you choose

When you want **main** (or **master**) changes to go live:

```bash
# 1. Make sure all edits are committed on main/master
git checkout main
git add .
git commit -m "Your message"
git push

# 2. Update production from main (this makes the site go live)
git checkout production
git merge main
git push

# 3. Go back to editing on main
git checkout main
```

Only run the **merge** and **push** to **production** when you are ready for the site to update.

---

## 4. DNS in Namecheap (for lunaseninsurance.co.uk)

If the domain is on **Namecheap**:

1. Log in → **Domain List** → **Manage** for **lunaseninsurance.co.uk**
2. Go to **Advanced DNS**

Add these so the domain points to GitHub Pages:

| Type  | Host | Value                    | TTL  |
|-------|------|---------------------------|------|
| A     | @    | 185.199.108.153           | Auto |
| A     | @    | 185.199.109.153           | Auto |
| A     | @    | 185.199.110.153           | Auto |
| A     | @    | 185.199.111.153           | Auto |
| CNAME | www  | lay162.github.io         | Auto |

(If you already have A or CNAME records for @ or www, edit them to the above instead of duplicating.)

**Custom domain in GitHub:** In **Settings → Pages → Custom domain**, use **lunaseninsurance.co.uk** (no `www`). GitHub will then serve both `lunaseninsurance.co.uk` and `www.lunaseninsurance.co.uk` if you set the CNAME for www as above.

---

## 5. Zoho DNS – records you must NOT remove

If you use **Zoho** for email (e.g. **support@lunaseninsurance.co.uk**), keep these in place:

- **MX** records that point to Zoho (e.g. `mx.zoho.com`, `mx2.zoho.com`, etc.)
- Any **TXT** records Zoho gave you for SPF, DKIM, or domain verification
- Any **CNAME** records Zoho added for email (e.g. for verification or autodiscover)

Only add or change the **A** and **CNAME** records for the **website** (section 4). Do **not** remove or overwrite MX or Zoho-related TXT/CNAME records.

---

## Quick reference

| What you do        | Branch    | Result                    |
|--------------------|-----------|---------------------------|
| Edit site          | main      | No change to live site    |
| Push to main       | main      | No change to live site    |
| Merge main → production and push | production | Live site updates |

**CNAME file:** The repo already contains a **CNAME** file in the root with **lunaseninsurance.co.uk**. Do not delete it; it must be on the **production** branch for the custom domain to work.
