<template>
  <div class="q-pa-md">
    <q-table
      title="Departments"
      :data="data"
      :columns="columns"
      row-key="name"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td
            key="name"
            :props="props"
          >{{ props.row.name }}</q-td>
          <q-td
            key="rooms"
            :props="props"
          >{{ props.row.amountOfRooms }}</q-td>
          <q-td
            key="floor"
            :props="props"
          >{{ props.row.floor }}</q-td>
          <q-td
            key="colorCode"
            :props="props"
          >
            <q-badge :color="props.row.colorCode">{{props.row.colorCode}}</q-badge>
          </q-td>
          <q-td
            key="detailBtn"
            :props="props"
          >
            <q-btn
              color="accent"
              icon="remove_red_eye"
              flat
              label="Details"
              @click="goToDepartment(props.row.id)"
            ></q-btn>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
export default {
  data: () => ({
    columns: [
      {
        name: 'name',
        required: true,
        label: 'Department',
        align: 'left',
        field: 'name',
        sortable: true
      },
      {
        name: 'rooms',
        align: 'center',
        field: 'amountOfRooms',
        sortable: true,
        label: '# Rooms'
      },
      {
        name: 'floor',
        align: 'center',
        field: 'floor',
        sortable: true,
        label: 'Floor'
      },
      {
        name: 'colorCode',
        align: 'center',
        field: 'colorCode',
        label: 'Color Code'
      },
      {
        name: 'detailBtn',
        align: 'right',
        field: 'id'
      }
    ],
    data: [
      {
        id: '104ab42f11',
        name: 'Emergency',
        amountOfRooms: 35,
        floor: 1,
        colorCode: 'orange'
      },
      {
        id: '104ab42f11',
        name: 'Internal',
        amountOfRooms: 35,
        floor: 1,
        colorCode: 'green'
      },
      {
        id: '104ab42f11',
        name: 'Surgery',
        amountOfRooms: 35,
        floor: 1,
        colorCode: 'orange'
      },
      {
        id: '104ab42f11',
        name: 'Infectious',
        amountOfRooms: 35,
        floor: 1,
        colorCode: 'orange'
      },
      {
        id: '104ab42f11',
        name: 'Children',
        amountOfRooms: 35,
        floor: 1,
        colorCode: 'orange'
      }
    ]
  }),
  methods: {
    goToDepartment (depId) {
      this.$router.push({ path: `/departments/${depId}` });
    }
  }
};
</script>

<style>
</style>
