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
          licenseKey: "demo:1740318341938:61717c38030000000054ee29517d60d7b885313c0834a68bc7fc385a29",
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
  