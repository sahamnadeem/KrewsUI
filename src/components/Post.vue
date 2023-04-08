<template>
  <v-card class="ma-auto" color="#00b0be" theme="dark" max-width="600">
    <v-menu absolute v-if="content.user_id === user.id || user.role === 1">
      <template v-slot:activator="{ props }">
        <v-icon
          class="float-right ma-3"
          icon="mdi-dots-vertical"
          v-bind="props"
        ></v-icon>
      </template>
      <v-list theme="light">
        <v-list-item value="edit" v-if="content.user_id === user.id">
          <v-list-item-title
            ><v-icon icon="mdi-pencil" size="small" color="grey"></v-icon>
            Edit</v-list-item-title
          >
        </v-list-item>
        <v-list-item value="delete" v-if="content.user_id === user.id || user.role === 1">
          <v-list-item-title
            ><v-icon icon="mdi-delete" size="small" color="grey"></v-icon>
            Delete</v-list-item-title
          >
        </v-list-item>
      </v-list>
    </v-menu>

    <v-card-item :title="content.title ">
      <template v-slot:subtitle>
        <v-icon
          icon="mdi-clock"
          size="18"
          color="white"
          class="pb-1"
        ></v-icon>

        {{ content.created_at }}
      </template>
    </v-card-item>

    <v-card-text class="text-h5 py-2">
        {{ content.content }}
    </v-card-text>

    <v-card-actions>
      <v-list-item class="w-100">
        <template v-slot:prepend>
            <v-avatar color="white">
                <span class="text-h5">{{ content.user.name.split(' ').shift().charAt(0) + content.user.name.split(' ').pop().charAt(0) }}</span>
            </v-avatar>
        </template>

        <v-list-item-title>{{ content.user.name }}</v-list-item-title>
        <v-list-item-subtitle>{{ content.user.email }}</v-list-item-subtitle>

      </v-list-item>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
    props:{
        content:Object
    },
    data(){
        return{

        }
    },
    computed:{
        user(){
            return JSON.parse(localStorage.getItem('user'))
        }
    }
}
</script>