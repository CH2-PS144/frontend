# frontend
1. Clone the repository then open it using your code editor.

##Cleaning and updating server
```apt clean all && sudo apt update && sudo apt dist-upgrade```
```rm -rf /var/www/html```
##Installing Nginx
```apt install nginx```
##Delete the default server configuration
```rm /etc/nginx/sites-available/default```
```rm /etc/nginx/sites-enabled/default```
##First configuration
``` nano /etc/nginx/sites-available/frontend```
server {
  listen 80;

  location / {
        root /var/www/frontend;
        index  index.html index.htm;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        try_files $uri $uri/ /index.html;
  }
}
```ln -s /etc/nginx/sites-available/frontend /etc/nginx/sites-enabled/frontend```

write in terminal ```cd```
```cd /var/www/```
##Uploading Apps Using Git
```apt install git```
```mkdir frontend```
```git clone <this repository>```

##Start Nginx and check the page
```systemctl start nginx```
