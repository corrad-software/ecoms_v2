<script setup>
defineOptions({
  name: "Badge",
});

const props = defineProps({
  variant: {
    type: String,
    default: "default",
    validator: (value) =>
      ["default", "secondary", "info", "success", "warning", "danger", "outline", "ghost"].includes(value),
  },
});

const baseClasses =
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";

const variantClasses = {
  default:
    "bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] hover:bg-[rgb(var(--primary))/80",
  secondary:
    "bg-[rgb(var(--secondary))] text-[rgb(var(--secondary-foreground))] hover:bg-[rgb(var(--secondary))/80",
  info:
    "bg-[rgb(var(--info))] text-[rgb(var(--info-foreground))] hover:bg-[rgb(var(--info))/80",
  success:
    "bg-[rgb(var(--success))] text-[rgb(var(--success-foreground))] hover:bg-[rgb(var(--success))/80",
  warning:
    "bg-[rgb(var(--warning))] text-[rgb(var(--warning-foreground))] hover:bg-[rgb(var(--warning))/80",
  danger:
    "bg-[rgb(var(--danger))] text-[rgb(var(--danger-foreground))] hover:bg-[rgb(var(--danger))/80",
  outline:
    "border border-[rgb(var(--input))] text-foreground hover:bg-[rgb(var(--accent))] hover:text-[rgb(var(--accent-foreground))]",
  ghost: "hover:bg-transparent hover:text-foreground",
};

const badgeClasses = computed(() => {
  return `${baseClasses} ${variantClasses[props.variant]}`;
});
</script>

<template>
  <div :class="badgeClasses">
    <slot />
  </div>
</template>
