<template>
  <confirm-dialog
    v-model="dialog"
    :confirm-btn-props="{ label: 'Change' }"
    @confirm="confirmAnnouncementChange"
  >
    <template #activator="{ props }">
      <v-btn
        id="edit-announcement-btn"
        color="primary"
        class="mr-2"
        v-bind="props"
      >
        <v-icon start>
          mdi-bullhorn-outline
        </v-icon>
        Edit announcement
      </v-btn>
    </template>

    <template #title>
      Change announcement
    </template>

    <template #content>
      <v-text-field
        v-model="value"
        append-inner-icon="mdi-bullhorn-outline"
        label="Write your alert here..."
        single-line
        hide-details
        variant="outlined"
        clearable
        density="compact"
      />
    </template>
  </confirm-dialog>
</template>

<script>
import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import { ref, computed, onMounted } from 'vue';

import { confService, handleThriftError } from "@cc-api";

import { GET_ANNOUNCEMENT } from "@/store/actions.type";
import { SET_ANNOUNCEMENT } from "@/store/mutations.type";

import ConfirmDialog from "@/components/ConfirmDialog";

export default defineComponent({
  name: "EditAnnouncementBtn",
  components: {
    ConfirmDialog
  },
  setup() {
    const store = useStore();
    const dialog = ref(false);
    const value = ref(null);

    const announcement = computed(() => store.getters.announcement);

    onMounted(async () => {
      const announcement = await store.dispatch(GET_ANNOUNCEMENT);
      value.value = announcement;
    });

    const confirmAnnouncementChange = () => {
      const announcementB64 = value.value
        ? window.btoa(value.value) : window.btoa("");

      confService.getClient().setNotificationBannerText(announcementB64,
        handleThriftError(() => {
          dialog.value = false;
          store.commit(SET_ANNOUNCEMENT, value.value);
        }));
    };

    return {
      dialog,
      value,
      announcement,
      confirmAnnouncementChange
    };
  }
});
</script>