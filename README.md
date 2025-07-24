# Forum-App-Frontend

A forum/social media app made with the MERN stack. Users are able to create accounts, create posts and comments within different topics and save, like, and report posts. From the profile page, logged in users can manage their created content, control various settings such as picture, bio and content visibility and view notifications. Passwords are hashed using Bcrypt and user actions are authenticated with JWT. During account creation, a verification email with a OTP is sent to confirm that the email is valid before the account creation is completed. Accounts have permission levels of either User, Mod or Admin. Mods and admins have access to the moderation page, which allows them to delete content, send notifications to users or temporarily ban user accounts.

![A header section with options for menu and topics above sections of new and popular posts on a light blue background](/public/the-4em-app-screenshot.png)

![The profile page with options to update the profile image and bio, a list of saved posts that have been bookmarked and new notifications](/public/the-4em-app-profile.png)

## Running locally

[!IMPORTANT]
This repo is intended to be run in combination with https://github.com/KSmith8888/Forum-App-Backend in separate terminal windows

To run the project locally, you will need Node.js installed. If you don't already have it, download the LTS version at https://nodejs.org/en

First, run the following command in the terminal to clone the repo:

```
git clone https://github.com/KSmith8888/Forum-App-Frontend.git
```

(If you don't already have git installed, download it at https://git-scm.com/downloads)

Navigate into the root of the project by running:

```
cd Forum-App-Frontend
```

Install the project's dependencies with:

```
npm install
```

Run the development server with:

```
npm run dev
```

Finally, navigate to http://localhost:5173/ in your browser to view the project. Changes will be reflected automatically whenever you save.

[!NOTE]
You should create a .env file with the variable named VITE_BACKEND_URL and set the value to http://127.0.0.1:3000 during development.

## Attribution

### Dependencies

react and react-dom:  
https://github.com/facebook/react  
react-router:  
https://github.com/remix-run/react-router  
typescript:  
https://github.com/Microsoft/TypeScript  
vite:  
https://github.com/vitejs/vite  
eslint:  
https://github.com/eslint/eslint  
eslint-plugin-react:  
https://github.com/jsx-eslint/eslint-plugin-react  
@types/react and @types/react-dom:  
https://github.com/DefinitelyTyped/DefinitelyTyped  
@typescript-eslint/eslint-plugin and @typescript-eslint/parser:  
https://github.com/typescript-eslint/typescript-eslint  
@vitejs/plugin-react:  
https://github.com/vitejs/vite-plugin-react  
globals:  
https://github.com/sindresorhus/globals

### Images

Pexels-  
Coffee mug surrounded with coffee beans by Toni Cuenca:  
https://www.pexels.com/photo/coffee-mug-surrounded-with-coffee-beans-585753/  
Green tree on green grass field by Taylor Hunt:  
https://www.pexels.com/photo/green-tree-on-green-grass-field-2902440/  
Blue and yellow globe by Pixabay:  
https://www.pexels.com/photo/blue-and-yellow-globe-269724/  
Close up photo of gray laptop by Lukas:  
https://www.pexels.com/photo/close-up-photo-of-gray-laptop-577210/  
White yacht on running on blue body of water during daytime by Pixabay:  
https://www.pexels.com/photo/white-yacht-on-running-on-blue-body-of-water-during-daytime-163236/  
Lemon iced tea with lemon fruits by Barbara Webb:  
https://www.pexels.com/photo/lemon-iced-tea-with-lemon-fruits-792613/

Pixabay-  
Blank profile picture mystery man by Stephanie Edwards:  
https://pixabay.com/vectors/blank-profile-picture-mystery-man-973460/  
Apple red fruit red chief by NoName_13:  
https://pixabay.com/photos/apple-red-fruit-red-chief-1702316/  
Guitar electric guitar by PIRO:  
https://pixabay.com/photos/guitar-electric-guitar-2925282/  
Link hyperlink chain by inspire-studio:  
https://pixabay.com/vectors/link-hyperlink-chain-linking-6931554/  
File description outline document by Inspire-studio:  
https://pixabay.com/vectors/file-description-outline-document-6472230/  
Disk floppy file document memory bt Inspire-studio:  
https://pixabay.com/vectors/disk-floppy-file-document-memory-6780403/  
Inventory check list checklist by Inspire-studio:  
https://pixabay.com/vectors/inventory-check-list-checklist-6817561/

## License

MIT: https://github.com/KSmith8888/Forum-App-Frontend/blob/main/LICENSE
