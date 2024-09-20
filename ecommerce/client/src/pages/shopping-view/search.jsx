import { Input } from "@/components/ui/input";
import {
  fetchAllFilteredProducts,
  getSearchResults,
  resetSearchResults,
} from "@/store/shop/products-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

function SearchProducts({keyword,handleKeyword}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (keyword && keyword.trim() !== "" && keyword.trim().length > 0) {
      setTimeout(() => {
        setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
        dispatch(getSearchResults(keyword));
      }, 800);
    } else {
      setSearchParams(new URLSearchParams(``));
      dispatch(fetchAllFilteredProducts({ category: null }));
    }
  }, [keyword]);


  return (
        <div className="flex items-center w-80 min-w-44 m-3">
          <Input
            value={keyword}
            name="keyword"
            onChange={handleKeyword}
            className="py-4"
            placeholder="Search Products..."
          />
        </div>
  );
}

export default SearchProducts;
