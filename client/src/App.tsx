import { Switch, Route } from "wouter";
import { useState } from "react";
import Providers from "@/providers/Providers";
import Layout from "@/components/layout/Layout";
import ProductListing from "@/pages/ProductListing";
import ProductDetails from "@/pages/ProductDetails";
import Cart from "@/pages/Cart";
import Favorites from "@/pages/Favorites";
import NotFound from "@/pages/not-found";

function Router() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Layout onSearchChange={setSearchQuery} searchQuery={searchQuery}>
      <Switch>
        <Route path="/" component={() => <ProductListing searchQuery={searchQuery} />} />
        <Route path="/products/:id" component={ProductDetails} />
        <Route path="/cart" component={Cart} />
        <Route path="/favorites" component={Favorites} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <Providers>
      <Router />
    </Providers>
  );
}

export default App;
