import { useState, useMemo, useCallback } from "react";
import { Button, Card, DataTable, EmptyState, Frame, Heading, Page, Stack, TextField, Toast } from "@shopify/polaris";
import { ResourcePicker } from '@shopify/app-bridge-react';


const Index = () => {
  const [appendToTitle, setAppendToTitle] = useState('');
  const [appendToDescription, setAppendToDescription] = useState('');
  const [openPicker, setOpenPicker] = useState(false);
  const [products, setProducts] = useState([]);
  const [showToast, setShowToast] = useState(false);

  const productTableDisplayData = useMemo(() => products.map((product) => [
    product.id,
    product.title, 
    `${product.title}${appendToTitle}`,
    product.descriptionHtml,
    `${product.descriptionHtml}${appendToDescription}`
  ]), [products, appendToTitle, appendToDescription]);

  const submitHandler = useCallback(() => {
    console.log('Submitting');
    setShowToast(true);
  }, [])

  const toastMarkup = showToast ? 
  <Toast
    content="Update Successful"
    onDismiss={() => setShowToast(false)}
    duration={4000}
  /> : null

  return (
  <Frame>
  <Page>
    <Heading>Product Manager App 🎉</Heading>
    <Card>
      <Card.Section>
        <Stack vertical>
          <TextField
            label="Append To Title"
            value={appendToTitle}
            onChange={setAppendToTitle}
            />
            <TextField
            label="Append To Description"
            value={appendToDescription}
            onChange={setAppendToDescription}
            multiline={3}
            />
            <ResourcePicker
            resourceType="Product"
            showVariant={false}
            open={openPicker}
            onSelection={(resources) => {
              console.log(resources);
              setProducts(resources.selection);
            }}
            />
            <Button primary onClick={() => setOpenPicker(true)}>Select Products</Button>
        </Stack>
      </Card.Section>
      <Card.Section>
        {productTableDisplayData.length ? <DataTable
          columnContentTypes={['text', 'text', 'text', 'text', 'text', ]}
          headings={['ID', 'Old Title', 'New Title', 'Old Description', 'New Description']}
          rows={productTableDisplayData}
      /> : <EmptyState heading="No Products Selected" />}
      </Card.Section>
      <Card.Section>
        <Button primary onClick={submitHandler} disabled={!products.length}>Submit</Button>
      </Card.Section>
    </Card>
    {toastMarkup}
  </Page>
  </Frame>
);
}
export default Index;
