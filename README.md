# **Web Performance & Security Analyzer**  

## **Overview**  
Web Performance & Security Analyzer is a Chrome extension that provides insights into website performance, security, and tracking mechanisms. It evaluates SEO, web technologies, security protocols, and resource usage to help developers and security professionals analyze web pages efficiently.  

---

## **Features**  

### ✅ **Performance & SEO Analysis**  
- Detects page title and meta description  
- Counts `<h1>` tags and total hyperlinks  
- Calculates total page size  
- Identifies lazy-loaded images  

### ✅ **Technology Stack Detection**  
- Detects JavaScript frameworks like React  
- Identifies CSS frameworks such as Bootstrap  
- Determines CDN usage  
- Checks for WebAssembly support  

### ✅ **Security & Privacy Checks**  
- Validates HTTPS and mixed content issues  
- Detects Content Security Policy (CSP)  
- Analyzes potential XSS vulnerabilities  
- Checks for fingerprinting scripts  

### ✅ **Resource & Network Monitoring**  
- Counts total network requests  
- Displays total resource size (KB)  
- Lists third-party scripts  
- Detects active WebSockets  

### ✅ **Privacy & Tracking Analysis**  
- Counts cookies used  
- Detects Google Analytics scripts  
- Identifies third-party tracking scripts  

---

## **Installation**  

1. **Download the Extension:**  
   Clone this repository or download the ZIP.  
   ```bash
   git clone https://github.com/your-repo/web-analyzer-extension.git  
   cd web-analyzer-extension  
   ```  

2. **Load as an Unpacked Extension:**  
   - Open Chrome and go to `chrome://extensions/`  
   - Enable **Developer mode** (top right corner)  
   - Click **"Load unpacked"** and select the folder  

---

## **Usage**  

1. Click the **Web Analyzer** extension icon in the Chrome toolbar.  
2. The popup will display the page's performance, security, and tracking details.  
3. Use this data to optimize the webpage or detect security risks.  

---

## **How It Works**  

The extension injects a script into the active tab and gathers various details, including:  
- HTML metadata (title, description)  
- Security policies (HTTPS, CSP, mixed content)  
- Performance metrics (total requests, resource size)  
- Third-party scripts and tracking technologies  

This data is then displayed in a simple UI for easy interpretation.  

---

## **Contributing**  
If you'd like to contribute, feel free to submit a pull request or open an issue!  

---

## **License**  
This project is open-source under the **MIT License**.  