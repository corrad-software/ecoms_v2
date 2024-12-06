<script setup>
const { add: toast } = useToast();

const handleForgotPassword = async (formData) => {
  try {
    toast({
      title: "Success",
      description: "Reset link sent to your email",
      variant: "success",
    });
  } catch (error) {
    toast({
      title: "Error",
      description: error.message || "Failed to send reset link",
      variant: "destructive",
    });
  }
};
</script>

<template>
  <div class="min-h-screen grid md:grid-cols-2">
    <!-- Left side - Dark section with testimonial -->
    <div
      class="hidden md:flex flex-col bg-black text-white p-6 lg:p-8 relative"
    >
      <!-- Logo section -->
      <div class="flex items-center gap-2 text-base">
        <div class="p-0.5">⌘</div>
        Acme Inc
      </div>

      <!-- Testimonial section - positioned at bottom -->
      <div class="mt-auto">
        <blockquote
          class="text-xl lg:text-2xl font-medium leading-relaxed mb-3"
        >
          "This library has saved me countless hours of work and helped me
          deliver stunning designs to my clients faster than ever before."
        </blockquote>
        <p class="text-sm text-gray-400">Sofia Davis</p>
      </div>
    </div>

    <!-- Right side - Forgot Password form -->
    <div class="flex flex-col justify-between p-4 sm:p-6 lg:p-8">
      <!-- Top right login link -->
      <div class="text-right">
        <NuxtLink to="/login" class="text-sm text-gray-500 hover:text-gray-800">
          Login
        </NuxtLink>
      </div>

      <!-- Form section -->
      <div class="w-full max-w-sm mx-auto">
        <h1 class="text-2xl font-semibold mb-2">Reset password</h1>
        <p class="text-sm text-gray-500 mb-6">
          Enter your email address and we'll send you a link to reset your
          password
        </p>

        <FormKit
          type="form"
          :actions="false"
          @submit="handleForgotPassword"
          #default="{ value }"
          class="space-y-4"
        >
          <FormKit
            type="email"
            name="email"
            label="Email"
            placeholder="name@example.com"
            validation="required|email"
          />

          <Button
            type="submit"
            class="w-full bg-black text-white hover:bg-black/90 h-9"
          >
            Send Reset Link
          </Button>

          <div class="flex justify-center mt-4">
            <NuxtLink
              to="/login"
              class="text-sm text-gray-500 hover:text-gray-800"
            >
              Back to login
            </NuxtLink>
          </div>
        </FormKit>
      </div>

      <div></div>
      <!-- Spacer for flex alignment -->
    </div>
  </div>
</template>

<style scoped>
:deep(.formkit-input) {
  @apply w-full h-9 px-3 text-sm border border-gray-200 rounded-md 
         focus:outline-none focus:ring-1 focus:ring-black focus:border-black 
         transition-all duration-200;
}

:deep(.formkit-label) {
  @apply text-sm text-gray-600 mb-1;
}

:deep(.formkit-messages) {
  @apply text-xs mt-1 text-red-500;
}
</style>
