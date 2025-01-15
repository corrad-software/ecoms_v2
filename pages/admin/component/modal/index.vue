<script setup>
definePageMeta({
  title: "Modal",
  layout: "admin",
});

const isBasicModalOpen = ref(false);
const isCustomModalOpen = ref(false);
const isLargeModalOpen = ref(false);
const isNestedModalOpen = ref(false);
const isInnerModalOpen = ref(false);

const formData = reactive({
  name: '',
  email: '',
  bio: ''
});

const basicCode = `<template>
  <Button @click="isOpen = true">Open Modal</Button>
  <Modal v-model:open="isOpen">
    <ModalHeader>
      <ModalTitle>Modal Title</ModalTitle>
      <ModalDescription>This is a basic modal example.</ModalDescription>
    </ModalHeader>
    <ModalBody>
      <p>Modal content goes here.</p>
    </ModalBody>
    <ModalFooter>
      <Button variant="outline" @click="isOpen = false">Cancel</Button>
      <Button @click="isOpen = false">Continue</Button>
    </ModalFooter>
  </Modal>
</template>

<script setup>
const isOpen = ref(false);
<\/script>`;

const customCode = `<Modal v-model:open="isOpen">
  <ModalHeader>
    <ModalTitle>Edit Profile</ModalTitle>
    <ModalDescription>Make changes to your profile here.</ModalDescription>
  </ModalHeader>
  <ModalBody>
    <FormKit type="form" :actions="false" v-model="formData">
      <FormKit
        type="text"
        name="name"
        label="Name"
        placeholder="Enter your name"
        validation="required"
      />
      <FormKit
        type="email"
        name="email"
        label="Email"
        placeholder="Enter your email"
        validation="required|email"
      />
      <FormKit
        type="textarea"
        name="bio"
        label="Bio"
        placeholder="Tell us about yourself"
      />
    </FormKit>
  </ModalBody>
  <ModalFooter>
    <Button variant="outline" @click="isOpen = false">Cancel</Button>
    <Button @click="isOpen = false">Save Changes</Button>
  </ModalFooter>
</Modal>`;

const nestedCode = `<Modal v-model:open="isOuterOpen">
  <ModalHeader>
    <ModalTitle>Outer Modal</ModalTitle>
  </ModalHeader>
  <ModalBody>
    <p>This is the outer modal.</p>
    <Button @click="isInnerOpen = true">Open Inner Modal</Button>
  </ModalBody>
  <Modal v-model:open="isInnerOpen">
    <ModalHeader>
      <ModalTitle>Inner Modal</ModalTitle>
    </ModalHeader>
    <ModalBody>
      <p>This is the inner modal.</p>
    </ModalBody>
    <ModalFooter>
      <Button @click="isInnerOpen = false">Close</Button>
    </ModalFooter>
  </Modal>
</Modal>`;
</script>

<template>
  <div class="space-y-6">
    <!-- Introduction -->
    <Card>
      <CardHeader>
        <CardTitle>
          <h1 class="text-2xl font-bold">Modal</h1>
        </CardTitle>
        <CardDescription>
          A modal dialog component that overlays content on top of the main view, with customizable header, body, and footer sections.
        </CardDescription>
      </CardHeader>
    </Card>

    <!-- Basic Usage -->
    <Card>
      <CardHeader>
        <CardTitle>
          <h2 class="text-xl font-semibold">Basic Usage</h2>
        </CardTitle>
        <CardDescription>
          Basic modal example with header, body, and footer sections.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="mb-6">
          <Button @click="isBasicModalOpen = true">Open Modal</Button>
          <Modal v-model:open="isBasicModalOpen">
            <ModalHeader>
              <ModalTitle>Modal Title</ModalTitle>
              <ModalDescription>This is a basic modal example.</ModalDescription>
            </ModalHeader>
            <ModalBody>
              <p>Modal content goes here.</p>
            </ModalBody>
            <ModalFooter>
              <Button variant="outline" @click="isBasicModalOpen = false">Cancel</Button>
              <Button @click="isBasicModalOpen = false">Continue</Button>
            </ModalFooter>
          </Modal>
        </div>
        <div class="mt-4">
          <ClientOnly>
            <CodeBlock :code="basicCode" language="markup" />
          </ClientOnly>
        </div>
      </CardContent>
    </Card>

    <!-- Custom Content -->
    <Card>
      <CardHeader>
        <CardTitle>
          <h2 class="text-xl font-semibold">Custom Content</h2>
        </CardTitle>
        <CardDescription>
          Modal with form elements using FormKit.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="mb-6">
          <Button @click="isCustomModalOpen = true">Edit Profile</Button>
          <Modal v-model:open="isCustomModalOpen">
            <ModalHeader>
              <ModalTitle>Edit Profile</ModalTitle>
              <ModalDescription>Make changes to your profile here.</ModalDescription>
            </ModalHeader>
            <ModalBody>
              <FormKit type="form" :actions="false" v-model="formData">
                <FormKit
                  type="text"
                  name="name"
                  label="Name"
                  placeholder="Enter your name"
                  validation="required"
                />
                <FormKit
                  type="email"
                  name="email"
                  label="Email"
                  placeholder="Enter your email"
                  validation="required|email"
                />
                <FormKit
                  type="textarea"
                  name="bio"
                  label="Bio"
                  placeholder="Tell us about yourself"
                />
              </FormKit>
            </ModalBody>
            <ModalFooter>
              <Button variant="outline" @click="isCustomModalOpen = false">Cancel</Button>
              <Button @click="isCustomModalOpen = false">Save Changes</Button>
            </ModalFooter>
          </Modal>
        </div>
        <div class="mt-4">
          <ClientOnly>
            <CodeBlock :code="customCode" language="markup" />
          </ClientOnly>
        </div>
      </CardContent>
    </Card>

    <!-- Nested Modals -->
    <Card>
      <CardHeader>
        <CardTitle>
          <h2 class="text-xl font-semibold">Nested Modals</h2>
        </CardTitle>
        <CardDescription>
          Stack multiple modals on top of each other.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="mb-6">
          <Button @click="isNestedModalOpen = true">Open Nested Modal</Button>
          <Modal v-model:open="isNestedModalOpen">
            <ModalHeader>
              <ModalTitle>Outer Modal</ModalTitle>
            </ModalHeader>
            <ModalBody>
              <p>This is the outer modal.</p>
              <Button class="mt-4" @click="isInnerModalOpen = true">Open Inner Modal</Button>
            </ModalBody>
            <Modal v-model:open="isInnerModalOpen">
              <ModalHeader>
                <ModalTitle>Inner Modal</ModalTitle>
              </ModalHeader>
              <ModalBody>
                <p>This is the inner modal.</p>
              </ModalBody>
              <ModalFooter>
                <Button @click="isInnerModalOpen = false">Close</Button>
              </ModalFooter>
            </Modal>
          </Modal>
        </div>
        <div class="mt-4">
          <ClientOnly>
            <CodeBlock :code="nestedCode" language="markup" />
          </ClientOnly>
        </div>
      </CardContent>
    </Card>

    <!-- Props Documentation -->
    <Card>
      <CardHeader>
        <CardTitle>
          <h2 class="text-xl font-semibold">Props</h2>
        </CardTitle>
        <CardDescription>
          Available props for customizing the Modal components.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="space-y-6">
          <div>
            <h3 class="text-lg font-semibold mb-3">Modal Props</h3>
            <div class="relative overflow-x-auto">
              <table class="w-full text-sm text-left">
                <thead class="text-xs uppercase bg-muted/50">
                  <tr>
                    <th class="px-6 py-3">Prop</th>
                    <th class="px-6 py-3">Type</th>
                    <th class="px-6 py-3">Default</th>
                    <th class="px-6 py-3">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="border-b">
                    <td class="px-6 py-4 font-medium">open</td>
                    <td class="px-6 py-4">boolean</td>
                    <td class="px-6 py-4">false</td>
                    <td class="px-6 py-4">Controls the visibility of the modal</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 class="text-lg font-semibold mb-3">Events</h3>
            <div class="relative overflow-x-auto">
              <table class="w-full text-sm text-left">
                <thead class="text-xs uppercase bg-muted/50">
                  <tr>
                    <th class="px-6 py-3">Event</th>
                    <th class="px-6 py-3">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="border-b">
                    <td class="px-6 py-4 font-medium">update:open</td>
                    <td class="px-6 py-4">Emitted when the modal is opened or closed</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template> 