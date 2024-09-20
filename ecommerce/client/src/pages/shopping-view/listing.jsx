import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  fetchAllCategories,
  fetchAllFilteredProducts,
} from "@/store/shop/products-slice";
import { ArrowUpDownIcon, ChartBarStacked } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";


function ShoppingListing() {
  const dispatch = useDispatch();
  const { productList, categoryList } = useSelector(
    (state) => state.shopProducts
  );
  const [category, setCategory] = useState(null);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();


  function handleCategory(value) {
    setCategory(value);
    setSearchParams(new URLSearchParams(``));

  }

  useEffect(() => {
      dispatch(
        fetchAllFilteredProducts({ category: category })
      );
  }, [dispatch, category]);


  useEffect(() => {
      dispatch(
        fetchAllCategories()
      );
  }, []);


  return (
    <div className="grid grid-cols-1 gap-6 p-4 md:p-6">
      {/* <ProductFilter filters={filters} handleFilter={handleFilter} /> */}
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-extrabold">All Products</h2>
          <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ChartBarStacked className="h-4 w-4" />
                  <span>Category</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[300px] overflow-y-scroll h-96">
                <DropdownMenuRadioGroup value={category} onValueChange={handleCategory}>
                <DropdownMenuRadioItem
                      value={null}
                      key="Reset"
                    >
                      Reset
                    </DropdownMenuRadioItem>
                {categoryList && categoryList.length > 0
            ? categoryList.map((sortItem) => (
                    <DropdownMenuRadioItem
                      value={sortItem.slug}
                      key={sortItem.slug}
                    >
                      {sortItem.name}
                    </DropdownMenuRadioItem>
                  )) : null}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {productList && productList.length > 0
            ? productList.map((productItem,index) => (
                <ShoppingProductTile key={index}
                  product={productItem}
                />
              ))
            : null}
        </div>
      </div>
    </div>
  );
}

export default ShoppingListing;
