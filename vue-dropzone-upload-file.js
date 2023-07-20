// =============
// SINGLE FILE
// =============
const fileName = "SECRET DOCUMENT.png";
const filePath = `assets/${fileName}`;

// Read the file from the fixture
cy.fixture(filePath).then((fileContent) => {
  // Convert the file content to a Blob
  const blob = Cypress.Blob.base64StringToBlob(
    fileContent,
    "image/png",
  );

  // Create a File object from the Blob with the specified file name
  const file = new File([blob], fileName, { type: "image/png" });

  // Simulate the drop event on the dropzone element
  cy.get("#files").then((dropzone) => {
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);

    dropzone[0].dispatchEvent(
      new DragEvent("drop", {
        dataTransfer,
      }),
    );
  });
});
// =============
// END OF SINGLE FILE
// =============

// =============
// MULTIPLE FILE
// =============
describe('Multiple File Upload Test', () => {
  it('should upload multiple files', () => {
    const fileNames = ['YOGI 1.png', 'ARIF 2.png', 'WIDODO 3.png'];
    const fileObjects = [];

    // Read and create File objects for each file in the fixture
    fileNames.forEach((fileName) => {
      const filePath = `assets/${fileName}`;
      cy.fixture(filePath).then((fileContent) => {
        const blob = Cypress.Blob.base64StringToBlob(fileContent, 'image/png');
        const file = new File([blob], fileName, { type: 'image/png' });
        fileObjects.push(file);
      });
    });

    // After creating all File objects, simulate the drop event for each file
    cy.get('#files').then((dropzone) => {
      fileObjects.forEach((file) => {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);

        dropzone[0].dispatchEvent(
          new DragEvent('drop', {
            dataTransfer,
          })
        );
      });
    });

    // Add any assertions or interactions related to the uploaded files here
  });
});

// =============
// END OF MULTIPLE FILE
// =============
