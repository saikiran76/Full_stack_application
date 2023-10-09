
# E-commerce Goods Rental Platform

![Project Logo](/images/logo.png)

## Overview

Welcome to the E-commerce Goods Rental Platform – a solution for renting a wide range of items, from furniture to two-wheelers, and more. This repository houses the backend components of our platform.

### Features

- **Database Models:** I have meticulously designed database models for orders/rentals, products, categories, and users to ensure efficient data management.

- **Authentication:** The platform provides a robust authentication system, including user registration and login. Forgot Password and Reset Password features have been seamlessly integrated for added user convenience.

- **Image Upload:** I leveraged AWS S3 bucket services for seamless image uploading. This ensures that product images are presented to users in the most visually appealing way possible.

- **Payment Gateway:** I've integrated Razorpay as our payment gateway, making the checkout process smooth and secure for product orders/rentals.

## Getting Started

To set up the backend of this project on your local machine, follow these steps:

1. Clone this repository:

   ```bash
   git clone https://github.com/your-username/e-commerce-rental-platform.git
   ```

2. Install the required dependencies:

   ```bash
   cd e-commerce-rental-platform
   npm install
   ```

3. Configure Environment Variables:

   - Rename the `.env.example` file to `.env` and fill in the necessary environment variables such as database connection details, AWS S3 credentials, and Razorpay API keys. (if needed)

4. Start the server:

   ```bash
   npm start
   ```

5. Your backend server is up and running!

## Technology Stack

- **Backend:** Node.js with Express.js
- **Database:** MongoDB
- **User Authentication:** JSON Web Tokens (JWT)
- **Image Upload:** AWS S3 Bucket
- **Payment Gateway:** Razorpay

## Contributing

I do welcome contributions to improve the application!

### Contribution rules

- The issue or problem to be solved has been also mentioned in the script files. Try to figure it out and make a PR, so that I can fruitfully merge it.😉
- Please do not remove any existing code or comments.
- Try to keep your pull requests small to minimize merge conflicts.
- Make sure the code is functioning according to the issue mentioned in the scripting files

### Getting Started

To contribute to this repository, follow these steps:

1. Fork this repository (button on top)
2. Clone the repository to your local machine: `git clone https://github.com/saikiran76/Promises.git `
3. Navigate to the project directory: `cd <folder-name>`
4. Create a new branch: `git checkout -b my-new-branch`
5. Make your changes and commit them: `git add .` and `git commit -m "Relevant message"`
6. Push your changes to your forked repository: `git push origin my-new-branch`
7. Create a new pull request from your forked repository.

To contribute:

1. Fork the repository.

2. Create a new branch for your feature or bug fix:

   ```bash
   git checkout -b feature-name
   ```

3. Make your changes and commit them:

   ```bash
   git commit -m "Description of changes"
   ```

4. Push your changes to your fork:

   ```bash
   git push origin feature-name
   ```

5. Create a pull request, and changes will be reviewed.

### Avoiding Conflicts (Syncing your fork)

To avoid conflicts, you can add an 'upstream' for your git repository, as other pull requests may be merged while you're working on your branch/fork.

To add an upstream remote, use the following command: `git remote add upstream https://github.com/fineanmol/Hacktoberfest2023`

You can verify that the new remote has been added by typing: `git remote -v`

To pull any new changes from the parent repository, run: `git merge upstream/master`. This will allow you to easily solve any conflicts in your repository. It's a good idea to use this command frequently in between your own commits to ensure your repository is up to date with its parent.

For more information on syncing forks, you can read this article from GitHub: [Syncing a Fork](https://help.github.com/articles/syncing-a-fork/)

### Swags of Hacktoberfest

Many participants are attracted to Hacktoberfest for the chance to receive swag. After 4 successfully merged pull requests, you will be eligible to receive a Hacktoberfest T-shirt and some stickers delivered to your doorstep.

Thank you for your contributions and happy hacking!


## Contact

Have questions or suggestions? Feel free to reach out to us:

- Email: ksknew76@gmail.com
- GitHub: saikiran76(https://github.com/saikiran76)

```

In this revised README, I've included more detailed information, a section on getting started, a technology stack description, a contribution guide, and contact information. Additionally, I added a placeholder for the project logo, which you can replace with your actual logo or any other visually appealing design element to make your repository more attractive.
