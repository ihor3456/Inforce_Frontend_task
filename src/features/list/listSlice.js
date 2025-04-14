// export default createStore(reduser);
import { createSlice } from "@reduxjs/toolkit";
import { initData, sortList as SortListAPI } from "../../fakeAPI.js";

export const list = createSlice({
  name: "list",
  // set state data model
  initialState: {
    data: SortListAPI(initData),
    lastSort: "",
    product: { ...initData[0] },
    sortBy: "",
  },
  // set state action models
  reducers: {
    // list methods
    addNewProduct: (state, action) => {
      const id = 1 + Number(state.data.length);
      state.data.push({
        id,
        ...action.payload,
        comments: [],
      });
      SortListAPI(state.data, state.sortBy);
      localStorage.setItem("list", JSON.stringify(state.data));
    },
    sortList: (state, action) => {
      state.sortBy = action.payload;
      state.data = SortListAPI(state.data, state.sortBy);
    },
    initProduct: (state, action) => {
      state.product = state.data.find((item) => item.id === action.payload);
    },
    setProduct: (state, action) => {
      const index = state.data.findIndex((el) => el.id === state.product.id);
      // map is optional step 'cause single obj setting doesn't refresh state.data
      // state.data.map(item => {
      //   return item.id === state.product.id ?
      //   { ...action.payload } : item
      // })
      state.data[index] = { ...action.payload };
      localStorage.setItem("list", JSON.stringify(state.data));
    },
    deleteProduct: (state, action) => {
      state.data.splice(
        state.data.findIndex((el) => el.id === state.product.id),
        1
      );
      // optional to remove id errors
      state.data.map((item, index) => (item.id = ++index));
      localStorage.setItem("list", JSON.stringify(state.data));
    },
    addProductComment: (state, action) => {
      const d = new Date(),
        date =
          [
            String(d.getHours()).padStart(2, "0"),
            String(d.getMinutes()).padStart(2, "0"),
          ].join(":") +
          " " +
          [
            String(d.getMonth() + 1).padStart(2, "0"),
            String(d.getDate()).padStart(2, "0"),
            d.getFullYear(),
          ].join(".");
      const index = state.data.findIndex((x) => x.id === state.product.id);
      const id = 1 + Number(state.data[index].comments.length);
      state.data[index].comments.push({
        id,
        productId: state.product.id,
        description: action.payload,
        date,
      });
      state.product.comments = state.data[index].comments;
      localStorage.setItem("list", JSON.stringify(state.data));
    },
    deleteProductComment: (state, action) => {
      const index = state.data.findIndex((x) => x.id === state.product.id);
      state.product.comments.splice(
        state.product.comments.findIndex((x) => x.id === action.payload),
        1
      );
      // optional to remove id errors
      state.product.comments.map((item, index) => (item.id = ++index));
      state.data[index].comments = state.product.comments;
      localStorage.setItem("list", JSON.stringify(state.data));
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addNewProduct,
  sortList,
  initProduct,
  setProduct,
  deleteProduct,
  addProductComment,
  deleteProductComment,
} = list.actions;

export default list.reducer;
