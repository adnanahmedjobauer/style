<?php
require_once('config/db_connection.php');
$page_Name = "Sign Up - Anybd.zya.me";
$page_Description = "Create a new account on Anybd.zya.me. Join our community, share your thoughts, and engage with content by signing up today.";
$page_Keywords = "sign up, create account, Anybd.zya.me sign up, user registration, join community, new account, register, community engagement";
$page_URL = "https://anybd.com/index.php"; // Canonical URL
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Meta Tags for SEO -->
    <title><?php echo htmlspecialchars($page_Name); ?></title>
    <link rel='icon' type='image/x-icon' href='https://anybd.zya.me/favicon.ico'>
    <meta name="description" content="<?php echo htmlspecialchars($page_Description); ?>">
    <meta name="keywords" content="<?php echo htmlspecialchars($page_Keywords); ?>">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="<?php echo htmlspecialchars($page_URL); ?>">
    
    <!-- Open Graph Meta Tags for Social Sharing -->
    <meta property="og:title" content="<?php echo htmlspecialchars($page_Name); ?>">
    <meta property="og:description" content="<?php echo htmlspecialchars($page_Description); ?>">
    <meta property="og:url" content="<?php echo htmlspecialchars($page_URL); ?>">
    <meta property="og:image" content="https://anybd.com/images/logo.jpg">
    <meta property="og:type" content="website">

    <!-- Twitter Card Metadata -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="<?php echo htmlspecialchars($page_Name); ?>">
    <meta name="twitter:description" content="<?php echo htmlspecialchars($page_Description); ?>">
    <meta name="twitter:image" content="https://anybd.com/images/logo.jpg">

    <?php 
    require_once('config/header.php'); 
    if ($my_id) {
        echo("<script>window.location.href='/index.php';</script>");
    }
    ?>

    <link rel="stylesheet" href="style/login.css">
</head>
<body>
    <div class="container-fluid login-page dark-3 p-5 d-flex align-items-center justify-content-center">
        <div class="row">
            <div class="dark-6 rounded rounded-4">
                <div class="p-4">
                    <h2 class="text-center my-5 active m-3">Create Your Account</h2>
                    <form id="signUpForm" method="POST">
                        <div class="form-group mt-3">
                            <label class="active" for="fullName">Enter Your Name:</label>
                            <input type="text" id="fullName" name="fullName" class="form-control" required>
                        </div>
                        <div class="form-group mt-3">
                            <label class="active" for="email">Email address:</label>
                            <input type="email" id="email" name="email" class="form-control" required>
                        </div>
                        <div class="form-group mt-3">
                            <label class="active" for="password">Password:</label>
                            <input type="password" id="password" name="password" class="form-control" required>
                        </div>
                        <div class="form-group mt-3">
                            <label class="active" for="cpassword">Confirm Password:</label>
                            <input type="password" id="cpassword" name="cpassword" class="form-control" required>
                        </div>
                        <button type="submit" class="btn submit-btn fw-bold mt-3">SignUp</button>
                        <div class="text-center mt-3">
                            <small class="form-text text-white">Already have an account?<br> 
                                <a href="/login.php">Go To Login Page</a>.
                            </small>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <?php require('config/footer.php'); ?>

<script src="style/sign-up.js"></script>
</body>
</html>