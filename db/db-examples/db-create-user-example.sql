CREATE USER 'username'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON `database`.* TO 'user'@'localhost';
FLUSH PRIVILEGES;
