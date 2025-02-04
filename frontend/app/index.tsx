import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, Keyboard } from "react-native";
import axios from "axios";
import { API_URL } from '@env';

export default function Index() {
  const [category, setCategory] = useState("");
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");

  const handleAddProduct = async () => {
    if (!category || !productName || !price) {
      Alert.alert("Error", "Please enter all fields.");
      return;
    }

    const productData = {
      category,
      productName,
      price: parseFloat(price), // Convert price to number
    };

    try {
      const response = await axios.post(
        `${API_URL}/api/products/add-product`,
        productData, 
        { headers: { "Content-Type": "application/json" } } // Ensure JSON format
      );

      if (response.data.success) {
        Alert.alert("Success", "Product added successfully!");
        setCategory("");
        setProductName("");
        setPrice(""); // Reset price field
        Keyboard.dismiss(); // Dismiss the keyboard after success
      }
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "Failed to add product.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register a Product</Text>
      <TextInput
        style={styles.input}
        placeholder="Category"
        placeholderTextColor="grey"
        value={category}
        onChangeText={setCategory}
      />
      <TextInput
        style={styles.input}
        placeholder="Product Name"
        placeholderTextColor="grey"
        value={productName}
        onChangeText={setProductName}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        placeholderTextColor="grey"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric" // Ensures numeric input
        returnKeyType="done" // Adds the "Done" button on the keyboard
        blurOnSubmit={true} // Dismisses keyboard on submit
      />
      <Button title="Add Product" onPress={handleAddProduct} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: 250,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
});
