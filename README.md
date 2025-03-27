# Api-summative-project-

# Mugisha Weather App  
**Live Demo:** https://www.youtube.com/watch?v=yQZHNuUNSnE

Real-time weather forecasts for any location worldwide.

## Features  
- Search by city, country, or ZIP code (e.g., "Kigali" or "90210")
- Displays: Temperature (°C), Humidity, Wind Speed, UV Index
- Mobile-responsive design
- Secure HTTPS (Let’s Encrypt SSL)

## Setup (Ubuntu/Nginx)  
1. **Deploy files**:
   ```bash  
   ssh ubuntu@44.204.38.87
   sudo cp -r ./WeatherApp/* /var/www/html/
   sudo chown -R www-data:www-data /var/www/html/

Enable HTTPS:
sudo certbot --nginx -d mugisha.tech -d www.mugisha.tech

API Attribution

