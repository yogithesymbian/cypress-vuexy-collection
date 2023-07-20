// ==========
// B-FORM-FILE SINGLE FILE VUE
// ==========
const fileName = "IJIN BUNKER.png";
const filePath = `assets/${fileName}`;

// Read the file from the fixture
// Read the file from the fixture
cy.fixture(filePath, "binary").then((fileContent) => {
  // Convert the binary file content to a Blob
  const blob = Cypress.Blob.binaryStringToBlob(fileContent);

  // Create a File object from the Blob with the specified file name
  const file = new File([blob], fileName, { type: "image/png" }); // Adjust the 'type' accordingly

  // Find the file input element and attach the file
  cy.get('.custom-file.b-form-file input[type="file"]').then(
    (input) => {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      input[0].files = dataTransfer.files;
      cy.wrap(input).trigger("change", { force: true });
    },
  );

  // Perform any assertions or interactions related to the uploaded file here
});

// ==========
// END OF B-FORM-FILE SINGLE FILE VUE
// ==========
