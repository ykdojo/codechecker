<template>
  <v-container fluid>
    <v-alert
      v-model="success"
      type="success"
      variant="tonal"
      density="compact"
      closable
      border-color="success"
      :prepend-icon="mdiBadgeAccountHorizontalOutline"
    >
      Permission changes saved successfully!
    </v-alert>

    <v-alert
      v-model="error"
      type="error"
      variant="tonal"
      density="compact"
      closable
      border-color="error"
      :prepend-icon="mdiAlertOutline"
    >
      Some permission changes could not be saved!
    </v-alert>

    <v-row>
      <v-col>
        <product-user-permission
          :permissions="permissions"
          :auth-rights="userAuthRights"
          :bus="bus"
          :extra-params-json="extraParamsJSON"
          :is-group="false"
          v-model:success="success"
          v-model:error="error"
        />
      </v-col>
      <v-col>
        <product-group-permission
          :permissions="permissions"
          :auth-rights="groupAuthRights"
          :bus="bus"
          :extra-params-json="extraParamsJSON"
          :is-group="true"
          v-model:success="success"
          v-model:error="error"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import { mdiBadgeAccountHorizontalOutline, mdiAlertOutline } from '@mdi/js';
import PopulatePermissionsMixin from "./PopulatePermissions.mixin";
import ProductUserPermission from "./ProductUserPermission";
import ProductGroupPermission from "./ProductGroupPermission";

export default defineComponent({
  name: "EditProductPermission",
  components: {
    ProductUserPermission,
    ProductGroupPermission
  },
  mixins: [ PopulatePermissionsMixin ],
  props: {
    bus: { type: Object, required: true },
  },
  setup() {
    const success = ref(false);
    const error = ref(false);
    const scope = "SYSTEM";
    const extraParamsJSON = JSON.stringify({});

    onMounted(() => {
      this.populatePermissions(scope, extraParamsJSON);
    });

    return {
      scope,
      extraParamsJSON,
      success,
      error,
      mdiBadgeAccountHorizontalOutline,
      mdiAlertOutline
    };
  }
});
</script>