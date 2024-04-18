import { h } from "vue";
import { createColumnHelper } from "@tanstack/vue-table";
import { ArrowUpDown, ChevronDown } from "lucide-vue-next";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import DropdownAction from "./DataTableDropDown.vue";
import DialogAction from "./DialogImgViewer.vue";

export interface PersonInscription {
  id: number;
  created: Date;
  modified: Date;
  checkinAt: Date | null;
  status: "PENDIENTE" | "CONFIRMADO" | "REGISTRADO" | "ERROR";
  countgroup: number;
  vouchergroup: string;
  voucherpath: string;
  voucheramount: number;
  amount: number;
  personId: number;
  paymentMethodId: number;
  person: {
    id: number;
    created: Date;
    modified: Date;
    code: null;
    doc_num: string | null;
    names: string | null;
    lastnames: string | null;
    gender: string | null;
    birthday: Date;
    phone: string | null;
    email: string | null;
    church: string | null;
    type: string | null;
    status: boolean | null;
    documenttype_id: number | null;
    userId: number | null;
  };
  paymentmethod: {
    id: number;
    description: string;
    active: boolean;
  };
}
const setClassBadge = (status: PersonInscription["status"]) => {
  switch (status) {
    case "PENDIENTE":
      return "border-2 font-bold text-amber-500 border-amber-500";
    case "CONFIRMADO":
      return "border-2 font-bold text-violet-600 border-violet-600";
    case "REGISTRADO":
      return "border-2 font-bold text-green-500 border-green-500";
    case "ERROR":
      return "border-2 font-bold text-red-600 border-red-600";
  }
};

const columnHelper = createColumnHelper<PersonInscription>();

export const columns = [
  columnHelper.accessor("person", {
    header: "DNI",
    cell: ({ row }) => h("div", { class: "flex justify-center" }, row.getValue("person").doc_num),
  }),

  columnHelper.accessor("person", {
    header: "NOMBRES",
    cell: ({ row }) =>
      h("div", { class: "uppercase" }, `${row.getValue("person").names} ${row.getValue("person").lastnames}`),
  }),

  columnHelper.accessor("person", {
    enablePinning: true,
    header: "GENERO",
    cell: ({ row }) => {
      let genderClass = "";
      if (row.getValue("person").gender === "M") {
        genderClass = "text-blue-500 border-blue-500";
      } else {
        genderClass = "text-pink-500 border-pink-500";
      }
      return h(
        "div",
        { class: "capitalize" },
        h(Badge, { variant: "outline", class: genderClass }, () => row.getValue("person").gender)
      );
    },
  }),

  columnHelper.accessor("countgroup", {
    header: "# GRUPO",
    cell: ({ row }) => h("div", { class: "flex justify-center" }, row.getValue("countgroup")),
  }),
  columnHelper.accessor("vouchergroup", {
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: "ghost",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        },
        () => ["COD GRUPO", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]
      );
    },
    cell: ({ row }) => h("div", { class: "flex justify-center" }, row.getValue("vouchergroup")),
  }),

  columnHelper.accessor("paymentmethod", {
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: "ghost",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        },
        () => ["METODO PAGO", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]
      );
    },
    cell: ({ row }) => {
      const inscription = row.original;
      return h("div", { class: "flex justify-center items-center" }, [
        h("div", { class: "relative" }, h(DialogAction, { inscription })),
        h("div", { class: "uppercase" }, row.getValue("paymentmethod").description),
      ]);
    },
  }),

  columnHelper.accessor("amount", {
    header: "MONTO",
    cell: ({ row }) => h("div", { class: "flex justify-center" }, row.getValue("amount")),
  }),

  columnHelper.accessor("status", {
    enablePinning: true,
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: "ghost",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        },
        () => ["ESTADO", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]
      );
    },
    cell: ({ row }) =>
      h(
        "div",
        { class: "capitalize" },
        h(Badge, { variant: "outline", class: setClassBadge(row.getValue("status")) }, () => row.getValue("status"))
      ),
  }),

  columnHelper.display({
    id: "actions",
    enableHiding: false,
    cell: ({ row, table }) => {
      // const inscription = row.original;

      return h(
        "div",
        { class: "relative" },
        h(DropdownAction, {
          props: { inscription: row.original, reload: table.options.meta.reload },
        })
      );
    },
  }),
];

// EJEMPLO
export const columnsExample = [
  columnHelper.display({
    id: "select",
    header: ({ table }) =>
      h(Checkbox, {
        checked: table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate"),
        "onUpdate:checked": (value) => table.toggleAllPageRowsSelected(!!value),
        ariaLabel: "Select all",
      }),
    cell: ({ row }) => {
      return h(Checkbox, {
        checked: row.getIsSelected(),
        "onUpdate:checked": (value) => row.toggleSelected(!!value),
        ariaLabel: "Select row",
      });
    },
    enableSorting: false,
    enableHiding: false,
  }),

  columnHelper.accessor("amount", {
    header: () => h("div", { class: "text-right" }, "MONTO"),
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue("amount"));

      return h("div", { class: "text-right font-medium" }, () => amount.toFixed(2));
    },
  }),

  columnHelper.display({
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return h(
        "div",
        {
          class: "relative",
        },
        h(DropdownAction, {
          inscription: row.original,
        })
      );
    },
  }),
];

// export const columns: ColumnDef<Payment>[] = [
//   {
//     accessorKey: "amount",
//     header: () => h("div", { class: "text-right" }, "Amount"),
//     cell: ({ row }) => {
//       const amount = Number.parseFloat(row.getValue("amount"));
//       const formatted = new Intl.NumberFormat("en-US", {
//         style: "currency",
//         currency: "USD",
//       }).format(amount);

//       return h("div", { class: "text-right font-medium" }, formatted);
//     },
//   },
// ];
