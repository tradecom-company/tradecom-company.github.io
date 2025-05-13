document.getElementById('toggleAddProductBtn').addEventListener('click', () => {
  const formDiv = document.getElementById('addProductForm');
  formDiv.style.display = formDiv.style.display === 'none' ? 'block' : 'none';
});

document.getElementById('productForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append('nameEnglish', document.getElementById('productNameEn').value);
  formData.append('nameSwahili', document.getElementById('productNameSw').value);
  formData.append('description', document.getElementById('productDescription').value);
  formData.append('price', document.getElementById('productPrice').value);
  formData.append('quantity', document.getElementById('productQty').value);
  formData.append('category', document.getElementById('productCategory').value);
  formData.append('image', document.getElementById('productImage').files[0]);

  const res = await fetch('/api/products', {
    method: 'POST',
    body: formData
  });

  if (res.ok) {
 alert('Product added successfully!');
    document.getElementById('productForm').reset();
  } else {
    alert('Error uploading product');
  }
});


    




