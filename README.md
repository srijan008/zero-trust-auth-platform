# 🔐 Rate Limiter & Zero-Trust SSO Platform

## Overview
This project is a **Rate Limiter & Zero-Trust Single Sign-On (SSO) Platform** built to demonstrate a **production-grade authentication, authorization, and traffic-control system**. It enables secure access across multiple client applications while strictly enforcing Zero-Trust security principles.

The platform integrates **OAuth 2.0 (PKCE)**, **mutual TLS (mTLS)**, **asymmetric JWTs**, and **Redis-based rate limiting**, closely reflecting architectures used in modern SaaS and enterprise systems.

## Key Objectives
- Provide secure **Single Sign-On (SSO)** for multiple client applications  
- Enforce **Zero-Trust** access at both user and service levels  
- Protect APIs against abuse using **rate limiting**  
- Prevent common security attacks such as token replay and SSRF  

## ⚙️ Core Features

### ✅ Single Sign-On (SSO)
- Centralized authentication for multiple client applications  
- Unified user identity across services  
- Secure session and token management  

### ✅ OAuth 2.0 with PKCE
- Authorization Code Flow with **PKCE** for public clients  
- Protection against authorization code interception  
- Secure login flow for web applications  

### ✅ Token-Based Security
- **Asymmetric JWTs** for access tokens  
- Short-lived access tokens with refresh token rotation  
- **Global session revocation** across all connected client apps  

### ✅ Zero-Trust Backend Communication
- **Mutual TLS (mTLS)** for service-to-service authentication  
- Eliminates implicit trust between internal services  
- Prevents token replay and SSRF attacks  

### ✅ Rate Limiting & Traffic Control
- Rate limiting using **Redis** and **BullMQ**  
- **Leaky Bucket algorithm** implementation  
- Per-IP and per-user throttling to prevent abuse and DDoS-style traffic  

## 🧠 Security & System Design Concepts
- Zero-Trust Architecture  
- OAuth 2.0 Authorization Code Flow  
- PKCE (Proof Key for Code Exchange)  
- Asymmetric JWT signing and verification  
- Refresh token rotation & session invalidation  
- Mutual TLS (mTLS)  
- Rate limiting algorithms (Leaky Bucket)  

## 🛠️ Tech Stack
- ⚛️ **React** – Client applications  
- 🟢 **Node.js & Express** – Authentication and SSO APIs  
- 🗄️ **PostgreSQL** – User, client, and session data  
- 🔐 **OAuth 2.0 & PKCE** – Secure authentication flow  
- 🪪 **JWT (Asymmetric Keys)** – Token-based authorization  
- 🗄️ **Redis** – Rate limiting and caching  
- ⚙️ **BullMQ** – Distributed rate-limiting and background jobs  
- 🔒 **mTLS** – Secure service-to-service communication  

## 📦 Deliverables
- Zero-Trust SSO authentication service  
- OAuth 2.0 + PKCE implementation  
- Secure token lifecycle management  
- Redis-backed rate limiter with BullMQ  
- mTLS-secured backend services  
- Technical documentation and architecture notes  

## 🚀 Learning Outcomes
- Hands-on experience building enterprise-grade SSO systems  
- Deep understanding of Zero-Trust security principles  
- Practical implementation of OAuth, PKCE, and mTLS  
- Scalable rate-limiting strategies using Redis  
- Interview-ready project for backend, security, and platform roles  
