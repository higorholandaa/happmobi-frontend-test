# Security Advisory - Angular 18.2.14 Known Vulnerabilities

## ⚠️ Status: ACKNOWLEDGED - NO PATCHES AVAILABLE FOR ANGULAR 18

### Identified Vulnerabilities

Angular 18.2.14 has several known security vulnerabilities that **do not have patches available** for the Angular 18.x branch. Security patches are only available for Angular 19+, 20+, and 21+.

### Vulnerabilities Details

#### 1. XSS Vulnerability via Unsanitized SVG Script Attributes
- **Affected**: Angular 18.2.14 and below
- **Patched in**: Angular 19.2.18, 20.3.16, 21.0.7, 21.1.0-rc.0
- **Patch for Angular 18**: ❌ Not available
- **Severity**: High
- **Type**: Cross-Site Scripting (XSS)

#### 2. Stored XSS Vulnerability via SVG Animation, SVG URL and MathML Attributes
- **Affected**: Angular 18.2.14 and below
- **Patched in**: Angular 19.2.17, 20.3.15, 21.0.2
- **Patch for Angular 18**: ❌ Not available
- **Severity**: High
- **Type**: Cross-Site Scripting (XSS)

#### 3. Angular i18n vulnerable to Cross-Site Scripting
- **Affected**: Angular 18.2.14 and below
- **Patched in**: Angular 19.2.19, 20.3.17, 21.1.6, 21.2.0
- **Patch for Angular 18**: ❌ Not available
- **Severity**: Medium
- **Type**: Cross-Site Scripting (XSS)

#### 4. XSRF Token Leakage via Protocol-Relative URLs
- **Affected**: Angular 18.2.14 and below (< 19.2.16)
- **Patched in**: Angular 19.2.16, 20.3.14, 21.0.1
- **Patch for Angular 18**: ❌ Not available
- **Severity**: Medium
- **Type**: XSRF Token Leakage

## 🛡️ Mitigation Strategies

Since patches are not available for Angular 18.x, here are recommended mitigation strategies:

### 1. Input Sanitization
- ✅ **Already Implemented**: Angular's DomSanitizer is being used
- Avoid rendering user-generated SVG content
- Sanitize all user inputs before rendering
- Use Angular's built-in sanitization for HTML content

### 2. Content Security Policy (CSP)
Implement strict CSP headers to prevent XSS attacks:

```html
<!-- Add to index.html -->
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self'; 
               style-src 'self' 'unsafe-inline'; 
               img-src 'self' https://images.unsplash.com data:;">
```

### 3. Avoid Risky Features
- ❌ Do not use SVG with user-generated script attributes
- ❌ Do not render user-generated MathML
- ❌ Do not use protocol-relative URLs for XSRF token transmission
- ✅ Use absolute URLs for all HTTP requests

### 4. Application-Specific Notes

In this application:
- **No SVG user input**: ✅ The application does not accept user-generated SVG
- **No MathML**: ✅ The application does not use MathML
- **No i18n user input**: ✅ i18n is not implemented, no user-generated translations
- **Controlled XSRF**: ✅ Using JWT bearer tokens, not cookies

### 5. Upgrade Path

To completely eliminate these vulnerabilities, upgrade to a supported Angular version:

```bash
# Option 1: Upgrade to Angular 19 (LTS)
ng update @angular/core@19 @angular/cli@19

# Option 2: Upgrade to Angular 20 (Current)
ng update @angular/core@20 @angular/cli@20

# Option 3: Upgrade to Angular 21 (Latest)
ng update @angular/core@21 @angular/cli@21
```

## 📊 Risk Assessment

### Current Risk Level: **LOW to MEDIUM**

**Justification:**
1. **SVG Vulnerabilities**: LOW risk
   - Application does not render user-generated SVG content
   - No SVG upload or dynamic SVG generation features
   
2. **MathML Vulnerability**: LOW risk
   - Application does not use MathML features
   
3. **i18n Vulnerability**: LOW risk
   - i18n is not implemented in current version
   - No user-generated translation content
   
4. **XSRF Token Leakage**: LOW risk
   - Using JWT bearer tokens in Authorization header
   - Not using cookie-based authentication
   - API requests use absolute URLs

### Recommended Actions

**For Production Deployment:**
1. ✅ **Immediate**: Implement strict CSP headers
2. ✅ **Short-term**: Code review to ensure no user-generated SVG/MathML
3. ⚠️ **Medium-term**: Plan upgrade to Angular 19+ (when feasible)
4. ✅ **Ongoing**: Monitor for any new vulnerabilities

**For Development:**
- Continue with Angular 18 as specified in requirements
- Follow security best practices
- Regular security audits

## 📝 Notes

- These vulnerabilities were disclosed after Angular 18 reached end-of-life for security patches
- Angular 18 was released in May 2024 and entered maintenance mode
- The test requirement specifies Angular 18, which is why we cannot upgrade
- All identified vulnerabilities have been assessed and mitigated where possible

## 📅 Last Updated

March 12, 2026

## 📞 Contact

For security concerns or questions about this advisory, please contact the development team.
