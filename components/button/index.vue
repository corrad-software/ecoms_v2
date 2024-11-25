<script setup>
const props = defineProps({
  variant: {
    type: String,
    default: "primary",
    validator: (value) =>
      ["primary", "secondary", "info", "success", "warning", "danger", "outline", "ghost"].includes(
        value
      ),
  },
  size: {
    type: String,
    default: "default",
    validator: (value) => ["default", "sm", "lg", "icon"].includes(value),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: "button",
    validator: (value) => ["button", "submit", "reset"].includes(value),
  },
});

const baseClasses = `
  inline-flex items-center justify-center rounded-md text-sm font-medium
  ring-offset-[rgb(var(--background))] transition-colors
  focus-visible:outline-none focus-visible:ring-1
  focus-visible:ring-[rgb(var(--ring))] focus-visible:ring-offset-0
  disabled:pointer-events-none disabled:opacity-50 border-[var(--radius)]
`;

const variantClasses = {
  primary:
    "bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] hover:bg-[rgba(var(--primary),0.9)]",
  secondary:
    "bg-[rgb(var(--secondary))] text-[rgb(var(--secondary-foreground))] hover:bg-[rgba(var(--secondary),0.9)]",
  info:
    "bg-[rgb(var(--info))] text-[rgb(var(--info-foreground))] hover:bg-[rgba(var(--info),0.9)]",
  success:
    "bg-[rgb(var(--success))] text-[rgb(var(--success-foreground))] hover:bg-[rgba(var(--success),0.9)]",
  warning:
    "bg-[rgb(var(--warning))] text-[rgb(var(--warning-foreground))] hover:bg-[rgba(var(--warning),0.9)]",
  danger:
    "bg-[rgb(var(--danger))] text-[rgb(var(--danger-foreground))] hover:bg-[rgba(var(--danger),0.9)]",
  outline:
    "border border-input bg-background hover:bg-[rgb(var(--accent))] hover:text-[rgb(var(--accent-foreground))]",
  ghost:
    "hover:bg-[rgb(var(--accent))] hover:text-[rgb(var(--accent-foreground))]",
};

const sizeClasses = {
  default: "h-9 px-4 py-2",
  sm: "h-8 rounded-md px-3",
  lg: "h-10 rounded-md px-8",
  icon: "h-9 w-9",
};

const buttonClasses = computed(() => {
  return `${baseClasses} ${variantClasses[props.variant]} ${
    sizeClasses[props.size]
  }`;
});
</script>

<template>
  <button :class="buttonClasses" :disabled="disabled" :type="type">
    <slot />
  </button>
</template>
