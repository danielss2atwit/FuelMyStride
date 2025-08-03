import 'dotenv/config';


export default {
  "expo": {
    "name": "FuelMyStride",
    "slug": "FuelMyStride",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "newArchEnabled": true,
    "splash": {
      "image": "./assets/icon.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/background.png",
        "backgroundColor": "#ffffff"
      },
      "edgeToEdgeEnabled": true
    },
    "web": {
      "favicon": "./assets/background.png"
    },
    "extra":{
      "openaiApiKey": process.env.OPENAI_KEY,
    "claudeApiKey": process.env.CLAUDE_API_KEY    }
  }
}
