import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"; // Assume a dialog component exists
import useAuth from "@/hooks/useAuth";
import axios from "axios";
import { toast } from "sonner";
import { Toaster } from "sonner";
import { filterItems } from "../utils/search";
const AdminCategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [error, setError] = useState(null);
  const { auth } = useAuth();

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    // Filter categories based on the search query
    setFilteredCategories(filterItems(categories, searchQuery, "name"));
  }, [categories, searchQuery]);

  const fetchCategories = async () => {
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };
      if (auth?.accessToken) {
        config.headers.Authorization = `Bearer ${auth.accessToken}`;
      }
      const response = await fetch("http://localhost:3500/categories", config);
      if (!response.ok) throw new Error("Failed to fetch categories");
      const data = await response.json();
      setCategories(data);
    } catch (err) {
      setError("Error fetching categories");
    }
  };

  const handleAddCategory = async () => {
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };
      if (auth?.accessToken) {
        config.headers.Authorization = `Bearer ${auth.accessToken}`;
      }

      const response = await axios.post(
        "http://localhost:3500/categories",
        {
          name: newCategoryName,
        },
        config
      );
      toast.success(response.data.message);
      setNewCategoryName("");
      fetchCategories(); // Refresh categories
    } catch (err) {
      setError("Error adding category");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Category Management</h1>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <Toaster />

      {/* Search Field */}
      <Input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search categories..."
        className="mb-4"
      />

      {/* Modal Trigger */}
      <Dialog>
        <DialogTrigger>
          <Button className="mb-4">Add New Category</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Category</DialogTitle>
          </DialogHeader>
          <Input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="Enter category name"
            className="mb-4"
          />
          <Button onClick={handleAddCategory}>Save Category</Button>
        </DialogContent>
      </Dialog>

      {/* Categories Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCategories.map((category) => (
            <TableRow key={category._id}>
              <TableCell>{category._id}</TableCell>
              <TableCell>{category.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminCategoryManagement;
