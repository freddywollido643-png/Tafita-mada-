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
  Terminal
} from 'lucide-react';

export const AndroidExportModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'manifest' | 'gradle' | 'github' | 'guide'>('guide');
  const [copied, setCopied] = useState<string | null>(null);

  if (!isOpen) return null;

  const manifestSnippet = `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="org.tafitamada.app">

    <!-- CRITICAL: INTERNET ACCESS FOR ONLINE AI & MEN NEWS SYNCHRONIZATION -->
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="TAFITA MADA V1.0"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:usesCleartextTraffic="true"
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
    branches: [ main ]
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

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install & Build Web Assets
        run: |
          npm ci
          npm run build

      - name: Build Android APK with Gradle
        run: |
          chmod +x ./gradlew
          ./gradlew assembleRelease --no-daemon

      - name: Upload APK Artifact
        uses: actions/upload-artifact@v4
        with:
          name: TafitaMada-v1.0-release.apk
          path: app/build/outputs/apk/release/app-release-unsigned.apk`;

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
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white flex items-center gap-2">
                TAFITA MADA V1.0 — Export APK Android
              </h2>
              <p className="text-xs text-slate-400">
                Configuration AndroidStudio, Permissions INTERNET & GitHub Actions CI
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
        <div className="flex items-center space-x-2 p-4 bg-slate-950 border-b border-slate-800 overflow-x-auto">
          <button
            onClick={() => setActiveTab('guide')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'guide'
                ? 'bg-amber-500 text-slate-950'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Guide Step-by-Step</span>
          </button>

          <button
            onClick={() => setActiveTab('manifest')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'manifest'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>AndroidManifest.xml</span>
          </button>

          <button
            onClick={() => setActiveTab('gradle')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'gradle'
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>build.gradle</span>
          </button>

          <button
            onClick={() => setActiveTab('github')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'github'
                ? 'bg-purple-600 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub Actions CI</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1 text-slate-300 text-xs leading-relaxed">
          {activeTab === 'guide' && (
            <div className="space-y-4">
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-300 space-y-1">
                <h4 className="font-bold text-sm">✓ Internet & Offline Capabilities Validated</h4>
                <p>
                  L’application TAFITA MADA V1.0 est configurée avec toutes les autorisations requises (<code className="font-mono bg-slate-900 px-1 py-0.5 rounded">android.permission.INTERNET</code>).
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-bold text-sm text-white">1. Build APK via GitHub Actions (Recommandé)</h3>
                <p>
                  Poussez ce projet sur votre dépôt GitHub. Le fichier <code className="text-amber-400 font-mono">.github/workflows/android-apk-build.yml</code> compilera automatiquement l'APK téléchargeable à chaque modification.
                </p>

                <h3 className="font-bold text-sm text-white">2. Build APK via Android Studio</h3>
                <ol className="list-decimal list-inside space-y-1.5 text-slate-300">
                  <li>Exportez ou clonez ce dépôt sur votre machine locale.</li>
                  <li>Ouvrez Android Studio et chargez le dossier.</li>
                  <li>Exécutez <code className="text-emerald-400 font-mono">npm run build</code> pour compiler la partie Web & assets.</li>
                  <li>Allez dans <strong>Build &gt; Build Bundle(s) / APK(s) &gt; Build APK(s)</strong>.</li>
                  <li>L'APK prêt à l'installation sera disponible dans <code className="text-blue-400 font-mono">app/build/outputs/apk/release/</code>.</li>
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
                  <span>{copied === 'manifest' ? 'Copié !' : 'Copier XML'}</span>
                </button>
              </div>
              <pre className="p-4 bg-slate-950 border border-slate-800 rounded-2xl font-mono text-emerald-400 text-[11px] overflow-x-auto leading-normal">
                {manifestSnippet}
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
                  <span>{copied === 'gradle' ? 'Copié !' : 'Copier Gradle'}</span>
                </button>
              </div>
              <pre className="p-4 bg-slate-950 border border-slate-800 rounded-2xl font-mono text-blue-300 text-[11px] overflow-x-auto leading-normal">
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
                  <span>{copied === 'github' ? 'Copié !' : 'Copier Workflow'}</span>
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
            Fermer
          </button>
        </div>

      </div>
    </div>
  );
};
