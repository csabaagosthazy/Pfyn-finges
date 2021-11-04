# To do list
Just one person edit this file, otherwise we'll have each time merge conflict on git

* Baptiste
  * Display the web pages linked to the QR codes that he/she has previously unlocked
  * Display approximate position of user undiscovered POIs
  * Do dbService method to modify, setInactive POIs
  * Refresh map when adding new POIs
* Csaba
  * in “SignUp”, all the form fields are uncontrolled components using “refs”. This is usually not the way it’s done in React and it is not really recommended according to the official documentation : https://reactjs.org/docs/uncontrolled-components.html. Consider changing these form fields into controlled components (you can use a similar approach as for adding books in the exercises, or look at a library such as Formik to reduce boilerplate code).
  * Deleting, modifying POI from table (Baptiste will do the dbService method to modify, setInactive)
  * Add a button to show Qr Code in each table line 
* Bastien
  * Create a web page with multi-media content (Wix Website)
  * When adding POI from admin page, i always can't add lat, long as float | Because we store lat & long as string in the database
* Paulo
  * Multi-language support for visitor and admin
    * See Roger comments about languageContext in the Word file
  * Add rules on firebase 
    * https://firebase.google.com/docs/firestore/security/rules-structure
    * https://firebase.google.com/docs/auth/admin/custom-claims
  
* Free to take
  * User guide
  * Technical guide
  * List of competencies through screen copies (on the XLS file on teams)