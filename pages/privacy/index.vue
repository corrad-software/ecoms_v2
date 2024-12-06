<script setup>
// No specific functionality needed for this page
</script>

<template>
  <div class="min-h-screen bg-white">
    <!-- Header -->
    <header class="border-b">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <NuxtLink to="/" class="flex items-center gap-2 text-base">
            <div class="p-0.5">⌘</div>
            Acme Inc
          </NuxtLink>

          <!-- Login link -->
          <NuxtLink
            to="/login"
            class="text-sm text-gray-500 hover:text-gray-800"
          >
            Login
          </NuxtLink>
        </div>
      </div>
    </header>

    <!-- Main content -->
    <main class="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="max-w-3xl mx-auto">
        <h1 class="text-2xl font-semibold mb-8">Privacy Policy</h1>

        <div class="prose prose-gray max-w-none">
          <h2 class="text-xl font-medium mt-8 mb-4">
            1. Information We Collect
          </h2>
          <p class="text-gray-600 mb-4">
            We collect information you provide directly to us when you create an
            account, make a purchase, or communicate with us. This may include:
          </p>
          <ul class="list-disc pl-5 text-gray-600 mb-4">
            <li>Name and contact information</li>
            <li>Account credentials</li>
            <li>Payment information</li>
            <li>Communication preferences</li>
          </ul>

          <h2 class="text-xl font-medium mt-8 mb-4">
            2. How We Use Your Information
          </h2>
          <p class="text-gray-600 mb-4">
            We use the information we collect to provide, maintain, and improve
            our services. This includes:
          </p>
          <ul class="list-disc pl-5 text-gray-600 mb-4">
            <li>Processing your transactions</li>
            <li>Sending you technical notices</li>
            <li>Responding to your comments and questions</li>
            <li>Developing new products and services</li>
          </ul>

          <h2 class="text-xl font-medium mt-8 mb-4">3. Information Sharing</h2>
          <p class="text-gray-600 mb-4">
            We do not share your personal information with third parties except
            as described in this privacy policy or with your consent.
          </p>

          <h2 class="text-xl font-medium mt-8 mb-4">4. Data Security</h2>
          <p class="text-gray-600 mb-4">
            We take reasonable measures to help protect information about you
            from loss, theft, misuse, unauthorized access, disclosure,
            alteration, and destruction.
          </p>

          <h2 class="text-xl font-medium mt-8 mb-4">5. Your Rights</h2>
          <p class="text-gray-600 mb-4">
            You have the right to access, update, or delete your personal
            information. You can do this through your account settings or by
            contacting us directly.
          </p>
        </div>

        <div class="mt-12 pt-8 border-t">
          <p class="text-sm text-gray-500">Last updated: March 14, 2024</p>
          <p class="text-sm text-gray-500 mt-2">
            Contact us at:
            <a
              href="mailto:privacy@acme.com"
              class="text-primary hover:underline"
              >privacy@acme.com</a
            >
          </p>
        </div>
      </div>
    </main>
  </div>
</template>
