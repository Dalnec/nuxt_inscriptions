import { h } from "vue";
import { createColumnHelper } from "@tanstack/vue-table";
import DialogActionUser from "./DialogActionUser.vue";
import FormUser from "./FormUser.vue";

export interface User {
  id: number;
  email: string;
  name: string | null;
  profileId: number | null;
  profile: {
    id: number;
    description: string;
  } | null;
}

const columnHelper = createColumnHelper<User>();

export const columns = [
  columnHelper.accessor("id", {
    header: "#",
    cell: ({ row }) => h("div", { class: "flex justify-center" }, row.getValue("id")),
  }),

  columnHelper.accessor("email", {
    header: "EMAIL",
    cell: ({ row }) => h("div", {}, row.getValue("email")),
  }),

  columnHelper.accessor("name", {
    header: "NOMBRE",
    cell: ({ row }) => h("div", {}, row.getValue("name")),
  }),

  columnHelper.display({
    id: "actions",
    enableHiding: false,
    cell: ({ row, table }) => {
      return h("div", { class: "flex justify-end items-center space-x-4" }, [
        h(FormUser, {
          props: {
            item: row.original,
            action: "edition",
            profiles: table.options.meta.profiles,
            reload: table.options.meta.reload,
          },
        }),
        h(DialogActionUser, {
          props: {
            item: row.original,
            action: "delete",
            title: "Eliminar Usuario",
            description: "¿Estás seguro de eliminar este usuario? Se eliminara de forma permanente.",
            reload: table.options.meta.reload,
          },
        }),
        // h(DropdownAction, {
        //   props: { inscription: row.original, reload: table.options.meta.reload },
        // }),
      ]);
    },
  }),
];
