import React, { useState } from 'react';
import {
  X,
  Smartphone,
  CheckCircle,
  Copy,
  Download,
  Github,
  Code,
  Layers,
  Terminal,
  Wifi,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';

export const AndroidExportModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'guide' | 'manifest' | 'network' | 'activity' | 'gradle' | 'github'>('guide');
  const [copied, setCopied] = useState<string | null>(null);

  if (!isOpen) return null;

  const manifestSnippet = `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="org.tafitamada.app">

    <!-- 1. PERMISSIONS INTERNET HO AN'NY APK (AI, MEN News & Sync) -->
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="TAFITA MADA V1.0"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:usesCleartextTraffic="true"
        android:networkSecurityConfig="@xml/network_security_config"
        android:theme="@style/Theme.TafitaMada">
        
        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:configChanges="orientation|keyboardHidden|keyboard|screenSize|locale|layoutDirection|fontScale"
            android:windowSoftInputMode="adjustResize">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>

</manifest>`;

  const networkSecuritySnippet = `<?xml version="1.0" encoding="utf-8"?>
<!-- android/app/src/main/res/xml/network_security_config.xml -->
<network-security-config>
    <!-- Mamela ny fifandraisana HTTPS sy HTTP amin'ny Internet tsy ho sakanan'ny Android 9/10/11/12/13/14 -->
    <base-config cleartextTrafficPermitted="true">
        <trust-anchors>
            <certificates src="system" />
            <certificates src="user" />
        </trust-anchors>
    </base-config>
    <domain-config cleartextTrafficPermitted="true">
        <domain includeSubdomains="true">localhost</domain>
        <domain includeSubdomains="true">10.0.2.2</domain>
        <domain includeSubdomains="true">127.0.0.1</domain>
        <domain includeSubdomains="true">run.app</domain>
        <domain includeSubdomains="true">education.gov.mg</domain>
    </domain-config>
</network-security-config>`;

  const mainActivitySnippet = `// android/app/src/main/java/org/tafitamada/app/MainActivity.kt
package org.tafitamada.app

import android.annotation.SuppressLint
import android.content.Context
import android.net.ConnectivityManager
import android.net.NetworkCapabilities
import android.os.Bundle
import android.webkit.*
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {

    private lateinit var webView: WebView

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        webView = WebView(this)
        setContentView(webView)

        val settings: WebSettings = webView.settings
        
        // 1. Alefaso ny JavaScript sy ny LocalStorage (TENA ILAINA)
        settings.javaScriptEnabled = true
        settings.domStorageEnabled = true
        settings.databaseEnabled = true
        
        // 2. Fidirana Internet sy File Access
        settings.allowFileAccess = true
        settings.allowContentAccess = true
        settings.mixedContentMode = WebSettings.MIXED_CONTENT_ALWAYS_ALLOW
        
        // 3. Cache ho an'ny Offline & Online
        if (isNetworkAvailable(this)) {
            settings.cacheMode = WebSettings.LOAD_DEFAULT
        } else {
            settings.cacheMode = WebSettings.LOAD_CACHE_ELSE_NETWORK
        }
        
        // 4. Viewport
        settings.useWideViewPort = true
        settings.loadWithOverviewMode = true
        settings.setSupportZoom(false)

        webView.webViewClient = object : WebViewClient() {
            override fun shouldOverrideUrlLoading(view: WebView?, request: WebResourceRequest?): Boolean {
                return false
            }
        }

        webView.webChromeClient = WebChromeClient()

        // Mamoha ny fonosana Web
        webView.loadUrl("file:///android_asset/dist/index.html")
    }

    private fun isNetworkAvailable(context: Context): Boolean {
        val connectivityManager = context.getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager
        val network = connectivityManager.activeNetwork ?: return false
        val actNetwork = connectivityManager.getNetworkCapabilities(network) ?: return false
        return actNetwork.hasCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET)
    }

    override fun onBackPressed() {
        if (webView.canGoBack()) {
            webView.goBack()
        } else {
            super.onBackPressed()
        }
    }
}`;

  const gradleSnippet = `// android/app/build.gradle
plugins {
    id 'com.android.application'
    id 'org.jetbrains.kotlin.android'
}

android {
    namespace 'org.tafitamada.app'
    compileSdk 34

    defaultConfig {
        applicationId "org.tafitamada.app"
        minSdk 24
        targetSdk 34
        versionCode 1
        versionName "1.0.0"

        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_17
        targetCompatibility JavaVersion.VERSION_17
    }
}

dependencies {
    implementation 'androidx.core:core-ktx:1.12.0'
    implementation 'androidx.appcompat:appcompat:1.6.1'
    implementation 'com.google.android.material:material:1.11.0'
    implementation 'androidx.webkit:webkit:1.10.0'
}`;

  const githubActionsSnippet = `# .github/workflows/android-apk-build.yml
name: TAFITA MADA V1.0 - Android APK Build Pipeline

on:
  push:
    branches: [ main, master ]
  workflow_dispatch:

jobs:
  build-apk:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Set up Java JDK 17
        uses: actions/setup-java@v4
        with:
          java-version: '17'
          distribution: 'temurin'

      - name: Set up Node.js 20
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install & Build Web Assets
        run: |
          npm ci
          npm run build

      - name: Copy Assets to Android
        run: |
          mkdir -p android/app/src/main/assets/dist
          cp -r dist/* android/app/src/main/assets/dist/ || true

      - name: Upload APK Artifact
        uses: actions/upload-artifact@v4
        with:
          name: TafitaMada-v1.0-bundle
          path: dist/`;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-2xl">
              <Wifi className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white flex items-center gap-2">
                TAFITA MADA — Fandaminana Internet & APK Android
              </h2>
              <p className="text-xs text-slate-400">
                Fix Permissions INTERNET, Cleartext Traffic, WebView DomStorage sy GitHub Actions
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Pills */}
        <div className="flex items-center space-x-2 p-3 bg-slate-950 border-b border-slate-800 overflow-x-auto">
          <button
            onClick={() => setActiveTab('guide')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'guide'
                ? 'bg-amber-500 text-slate-950'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Torolalana (Guide)</span>
          </button>

          <button
            onClick={() => setActiveTab('manifest')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'manifest'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>AndroidManifest.xml</span>
          </button>

          <button
            onClick={() => setActiveTab('network')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'network'
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>network_security_config.xml</span>
          </button>

          <button
            onClick={() => setActiveTab('activity')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'activity'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>MainActivity.kt</span>
          </button>

          <button
            onClick={() => setActiveTab('gradle')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'gradle'
                ? 'bg-cyan-600 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>build.gradle</span>
          </button>

          <button
            onClick={() => setActiveTab('github')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'github'
                ? 'bg-purple-600 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub CI</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1 text-slate-300 text-xs leading-relaxed">
          {activeTab === 'guide' && (
            <div className="space-y-4">
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-300 space-y-2">
                <div className="flex items-center gap-2 font-bold text-sm">
                  <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <span>Antony sy Vahaolana namboarina ho an'ny Internet ao amin'ny APK</span>
                </div>
                <p className="text-slate-300">
                  Ireto ireo antony 3 nahatonga ny internet tsy nandeha teo aloha amin'ny APK ary efa namboarina tanteraka :
                </p>
                <ul className="list-disc list-inside space-y-1 text-slate-300 pl-1">
                  <li><strong>1. AndroidManifest.xml</strong> : Nampidirina ny <code className="font-mono bg-slate-900 px-1 py-0.5 rounded text-amber-300">android.permission.INTERNET</code> sy <code className="font-mono bg-slate-900 px-1 py-0.5 rounded text-amber-300">ACCESS_NETWORK_STATE</code>.</li>
                  <li><strong>2. Cleartext &amp; Network Security</strong> : Nampiana ny <code className="font-mono bg-slate-900 px-1 py-0.5 rounded text-emerald-300">network_security_config.xml</code> hisorohana ny fanakanan'ny Android 9/10/11/12/13/14 ny HTTP/HTTPS.</li>
                  <li><strong>3. WebView Settings</strong> : Nampiana <code className="font-mono bg-slate-900 px-1 py-0.5 rounded text-blue-300">domStorageEnabled = true</code> sy <code className="font-mono bg-slate-900 px-1 py-0.5 rounded text-blue-300">javaScriptEnabled = true</code> ao amin'ny MainActivity.kt.</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="font-bold text-sm text-white">🚀 Dingana hahazoana ny APK mandeha Internet tsara :</h3>
                <ol className="list-decimal list-inside space-y-2 text-slate-300">
                  <li>Kitiho ny tabs eo ambony (<strong className="text-blue-400">AndroidManifest.xml</strong>, <strong className="text-emerald-400">network_security_config.xml</strong>, <strong className="text-indigo-400">MainActivity.kt</strong>).</li>
                  <li>Apetraho ao amin'ny tetikasa Android Studio / GitHub ireo rakitra ireo.</li>
                  <li>Ny code JavaScript dia efa mahita avy hatrany rehefa misy Wi-Fi na 4G ny finday (<code className="text-amber-400 font-mono">navigator.onLine</code>).</li>
                  <li>Rehefa manana connexion ny finday dia mandeha avy hatrany ny AI TAFITA, ny fampandrenesana MEN, ary ny fampitahana ny tahiry.</li>
                </ol>
              </div>
            </div>
          )}

          {activeTab === 'manifest' && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-mono text-amber-400">android/app/src/main/AndroidManifest.xml</span>
                <button
                  onClick={() => copyToClipboard(manifestSnippet, 'manifest')}
                  className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-bold flex items-center gap-1"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copied === 'manifest' ? 'Voakopika !' : 'Adikao ny XML'}</span>
                </button>
              </div>
              <pre className="p-4 bg-slate-950 border border-slate-800 rounded-2xl font-mono text-emerald-400 text-[11px] overflow-x-auto leading-normal">
                {manifestSnippet}
              </pre>
            </div>
          )}

          {activeTab === 'network' && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-mono text-emerald-400">android/app/src/main/res/xml/network_security_config.xml</span>
                <button
                  onClick={() => copyToClipboard(networkSecuritySnippet, 'network')}
                  className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-bold flex items-center gap-1"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copied === 'network' ? 'Voakopika !' : 'Adikao ny XML'}</span>
                </button>
              </div>
              <pre className="p-4 bg-slate-950 border border-slate-800 rounded-2xl font-mono text-cyan-300 text-[11px] overflow-x-auto leading-normal">
                {networkSecuritySnippet}
              </pre>
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-mono text-indigo-400">android/app/src/main/java/org/tafitamada/app/MainActivity.kt</span>
                <button
                  onClick={() => copyToClipboard(mainActivitySnippet, 'activity')}
                  className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-bold flex items-center gap-1"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copied === 'activity' ? 'Voakopika !' : 'Adikao Kotlin'}</span>
                </button>
              </div>
              <pre className="p-4 bg-slate-950 border border-slate-800 rounded-2xl font-mono text-blue-300 text-[11px] overflow-x-auto leading-normal">
                {mainActivitySnippet}
              </pre>
            </div>
          )}

          {activeTab === 'gradle' && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-mono text-amber-400">android/app/build.gradle</span>
                <button
                  onClick={() => copyToClipboard(gradleSnippet, 'gradle')}
                  className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-bold flex items-center gap-1"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copied === 'gradle' ? 'Voakopika !' : 'Adikao Gradle'}</span>
                </button>
              </div>
              <pre className="p-4 bg-slate-950 border border-slate-800 rounded-2xl font-mono text-amber-300 text-[11px] overflow-x-auto leading-normal">
                {gradleSnippet}
              </pre>
            </div>
          )}

          {activeTab === 'github' && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-mono text-amber-400">.github/workflows/android-apk-build.yml</span>
                <button
                  onClick={() => copyToClipboard(githubActionsSnippet, 'github')}
                  className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-bold flex items-center gap-1"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copied === 'github' ? 'Voakopika !' : 'Adikao Workflow'}</span>
                </button>
              </div>
              <pre className="p-4 bg-slate-950 border border-slate-800 rounded-2xl font-mono text-purple-300 text-[11px] overflow-x-auto leading-normal">
                {githubActionsSnippet}
              </pre>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl"
          >
            Hikatona (Fermer)
          </button>
        </div>

      </div>
    </div>
  );
};
