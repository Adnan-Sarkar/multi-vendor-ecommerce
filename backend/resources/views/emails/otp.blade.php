<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header {
            background-color: #2d6a4f;
            padding: 30px;
            text-align: center;
        }
        .header h1 {
            color: #ffffff;
            margin: 0;
            font-size: 24px;
        }
        .body {
            padding: 40px 30px;
            text-align: center;
        }
        .body p {
            color: #555555;
            font-size: 16px;
            line-height: 1.6;
        }
        .otp-box {
            display: inline-block;
            background-color: #f0f7f4;
            border: 2px dashed #2d6a4f;
            border-radius: 8px;
            padding: 20px 40px;
            margin: 20px 0;
        }
        .otp-box span {
            font-size: 36px;
            font-weight: bold;
            color: #2d6a4f;
            letter-spacing: 8px;
        }
        .warning {
            color: #e74c3c;
            font-size: 14px;
        }
        .footer {
            background-color: #f4f4f4;
            padding: 20px;
            text-align: center;
            color: #999999;
            font-size: 12px;
        }
    </style>
    <title>Password Reset OTP</title>
</head>
<body>
<div class="container">
    <div class="header">
        <h1>Multi Vendor Ecommerce</h1>
    </div>
    <div class="body">
        <p>Hello, <strong>{{ $name }}</strong>!</p>
        <p>We received a request to reset your password. Use the OTP below:</p>
        <div class="otp-box">
            <span>{{ $otp }}</span>
        </div>
        <p class="warning">⚠️ This OTP expires in <strong>10 minutes</strong>.</p>
        <p>If you didn't request this, please ignore this email.</p>
    </div>
    <div class="footer">
        <p>© {{ date('Y') }} Multi Vendor Ecommerce. All rights reserved.</p>
    </div>
</div>
</body>
</html>
