#!/bin/bash

# यह स्क्रिप्ट आपके प्रोजेक्ट कोड को GitHub पर भेजने में मदद करेगी।

echo "GitHub Push Helper"
echo "--------------------"

# जांचें कि क्या git पहले से मौजूद है
if [ -d ".git" ]; then
  echo "Git रिपॉजिटरी पहले से मौजूद है।"
else
  echo "एक नई Git रिपॉजिटरी बना रहा हूँ..."
  git init
  if [ $? -ne 0 ]; then
    echo "त्रुटि: Git रिपॉजिटरी बनाने में विफल। कृपया सुनिश्चित करें कि Git इंस्टॉल है।"
    exit 1
  fi
  
  echo "सभी प्रोजेक्ट फाइलों को जोड़ रहा हूँ..."
  git add .
  
  echo "पहला कमिट बना रहा हूँ..."
  git commit -m "Initial commit of the project"
fi

# उपयोगकर्ता से विवरण मांगें
echo ""
echo "कृपया अपना GitHub विवरण दर्ज करें:"

read -p "अपना GitHub यूज़रनेम दर्ज करें: " GITHUB_USERNAME
if [ -z "$GITHUB_USERNAME" ]; then
  echo "त्रुटि: GitHub यूज़रनेम खाली नहीं हो सकता।"
  exit 1
fi

read -p "अपनी GitHub रिपॉजिटरी का नाम दर्ज करें: " GITHUB_REPO_NAME
if [ -z "$GITHUB_REPO_NAME" ]; then
  echo "त्रुटि: GitHub रिपॉजिटरी का नाम खाली नहीं हो सकता।"
  exit 1
fi

echo ""
echo "महत्वपूर्ण: आपको अपने पासवर्ड की जगह एक Personal Access Token (PAT) का उपयोग करना होगा।"
echo "यदि आपके पास टोकन नहीं है, तो आप इसे यहाँ बना सकते हैं: https://github.com/settings/tokens/new"
echo "(टोकन बनाते समय 'repo' स्कोप चुनें)"
echo ""

read -sp "अपना GitHub Personal Access Token (PAT) पेस्ट करें: " GITHUB_TOKEN
if [ -z "$GITHUB_TOKEN" ]; then
  echo ""
  echo "त्रुटि: Personal Access Token खाली नहीं हो सकता।"
  exit 1
fi

echo ""
echo ""
echo "GitHub से कनेक्ट कर रहा हूँ..."

# मौजूदा रिमोट को हटा दें यदि कोई हो
git remote remove origin 2>/dev/null

# नया रिमोट जोड़ें
REMOTE_URL="https://""$GITHUB_USERNAME"":""$GITHUB_TOKEN""@github.com/""$GITHUB_USERNAME""/""$GITHUB_REPO_NAME"".git"
git remote add origin $REMOTE_URL

echo "मुख्य शाखा (branch) का नाम 'main' रख रहा हूँ..."
git branch -M main

echo "कोड को GitHub पर भेज रहा हूँ (Pushing)..."
git push -u origin main

if [ $? -eq 0 ]; then
  echo ""
  echo "🎉 सफलता! आपका कोड सफलतापूर्वक GitHub पर भेज दिया गया है।"
  echo "आप इसे यहाँ देख सकते हैं: https://github.com/$GITHUB_USERNAME/$GITHUB_REPO_NAME"
else
  echo ""
  echo "❌ त्रुटि: कोड को GitHub पर भेजने में विफल।"
  echo "कृपया सुनिश्चित करें कि आपका यूज़रनेम, रिपॉजिटरी का नाम और Personal Access Token सही हैं।"
  # विफल होने पर संवेदनशील यूआरएल को हटा दें
  git remote remove origin
fi
