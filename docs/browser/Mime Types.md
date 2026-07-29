# 🔍 Browser Plugins & MIME Types

By inspecting the browser environment via Chromium DevTools (Port `9223`), we can see the internal plugins and MIME types the TV supports. This reveals how the browser interacts with the TV's hardware, streaming protocols, and native applications.

## 💡 Key Discoveries

* **OIPF & HbbTV Integration:** The browser heavily relies on an internal plugin called `oipf_dae` (Open IPTV Forum Declarative Application Environment). This exposes low-level Smart TV features to web apps, such as channel broadcasting, recording schedulers, and parental controls.
* **Native Streaming & DRM:** The TV natively handles modern streaming protocols (MPEG-DASH, Apple HLS, Microsoft Smooth Streaming) and Microsoft PlayReady DRM directly through browser MIME types.
* **The Hisense Custom Plugin:** There is a highly specific, proprietary MIME type handled by `libhspdk-linux.so`. Fun fact: it contains a hardcoded typo: `applicatoin/hisense-webapp` instead of `application`. This is likely the core native library used to launch and run VIDAA web apps.

## 📋 Full List of Registered MIME Types

Below is the complete list of MIME types exposed by the browser environment and their associated internal plugins.

| MIME Type | Associated Plugin | Description / Context |
| :--- | :--- | :--- |
| `application/dash+xml` | `oipf_dae` | MPEG-DASH Streaming |
| `application/hbbtvcsmanager` | `oipf_dae` | HbbTV Companion Screen Manager |
| `application/hbbtvmediasynchroniser` | `oipf_dae` | HbbTV Media Synchronization |
| `application/oipfapplicationmanager` | `oipf_dae` | OIPF Application Management |
| `application/oipfcapabilities` | `oipf_dae` | OIPF Device Capabilities |
| `application/oipfconfiguration` | `oipf_dae` | OIPF System Configuration |
| `application/oipfdownloadmanager` | `oipf_dae` | OIPF Download Management |
| `application/oipfdownloadtrigger` | `oipf_dae` | OIPF Download Trigger |
| `application/oipfdrmagent` | `oipf_dae` | OIPF Digital Rights Management (DRM) |
| `application/oipfgatewayinfo` | `oipf_dae` | OIPF Gateway Information |
| `application/oipfobjectfactory` | `oipf_dae` | OIPF Object Factory |
| `application/oipfparentalcontrolmanager`| `oipf_dae` | TV Parental Control Integration |
| `application/oipfrecordingscheduler` | `oipf_dae` | PVR / Recording Capabilities |
| `application/oipfsearchmanager` | `oipf_dae` | OIPF Metadata Search |
| `application/vnd.apple.mpegurl` | `oipf_dae` | Apple HLS Streaming |
| `application/vnd.ms-playready.initiator+xml`| `oipf_dae`| Microsoft PlayReady DRM |
| `application/vnd.ms-sstr+xml` | `oipf_dae` | Microsoft Smooth Streaming |
| `application/vnd.oipf.contentaccessstreaming+xml`| `oipf_dae` | OIPF Content Access Streaming |
| `application/x-mpegurl` | `oipf_dae` | HLS Streaming (Legacy/Generic) |
| `audio/mpegurl` | `oipf_dae` | Audio HLS Streaming |
| `text/xml` | `oipf_dae` | XML Data / Subtitles / Manifests |
| `video/broadcast` | `oipf_dae` | Live TV Broadcast (Tuner) Integration |
| `applicatoin/hisense-webapp` | `libhspdk-linux.so` | Proprietary Hisense WebApp |
