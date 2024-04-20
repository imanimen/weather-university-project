from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET"],
    allow_headers=["*"],
)

def get_weather(city):
    api_key = "7df55745b3524612459191758eadb049"  # Replace this with your actual API key
    url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric"
    
    response = requests.get(url)
    data = response.json()
    
    if data["cod"] == 200:
        weather_description = data["weather"][0]["description"]
        temperature = data["main"]["temp"]
        humidity = data["main"]["humidity"]
        
        return {
            "city": city,
            "weather_description": weather_description,
            "temperature": temperature,
            "humidity": humidity
        }
    else:
        return {
            "city": city,
            "message": "Weather information not available"
        }

@app.get("/weather/{cities}")
async def get_weather_for_cities(cities: str):
    cities_list = cities.split(",")
    weather_data = []
    
    for city in cities_list:
        city_data = get_weather(city.strip())
        weather_data.append(city_data)
    
    return weather_data