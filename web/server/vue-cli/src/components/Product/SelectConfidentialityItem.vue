<template>
  <div class="d-flex align-center">
    <v-avatar
      :size="16"
      class="mr-2"
    >
      <confidentiality-icon
        :value="confidentialityFromStringToCode(value)"
        density="compact"
      />
    </v-avatar>
    {{ value }}
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { ConfidentialityMixin } from "@/mixins";
import { ConfidentialityIcon } from "@/components/Icons";

export default defineComponent({
  name: "SelectConfidentialityItem",
  components: {
    ConfidentialityIcon
  },
  mixins: [ ConfidentialityMixin ],
  props: {
    value: { type: String, required: true }
  }
});
</script>