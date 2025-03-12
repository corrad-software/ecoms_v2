<template>
    <div class="pdf-viewer">
      <div ref="viewer" class="webviewer"></div>
    </div>
  </template>
  
  <script>
  import WebViewer from "@pdftron/webviewer";
  
  export default {
    name: "PdfViewer",
    mounted() {
      WebViewer(
        {
          path: "/webviewer/lib", // WebViewer assets
          licenseKey: "demo:1741050364197:614a2141030000000080772b27d2263ea9e59f4e777868bbdfb442ce4e",
          initialDoc: "/assets/pdf/Resume.pdf", // Local PDF file
        },
        this.$refs.viewer
      ).then((instance) => {
        const { docViewer } = instance;
        docViewer.on("documentLoaded", () => {
          console.log("Document loaded successfully!");
        });
      });
    },
  };
  </script>
  
  <style>
  .pdf-viewer {
    width: 100%;
    height: 100vh;
  }
  .webviewer {
    width: 100%;
    height: 100%;
  }
  </style>
  