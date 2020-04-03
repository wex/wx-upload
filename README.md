# wx-upload
WebComponent to handle image uploads with browse preview.

## Installing

Download latest release and use it.

`<script src="js/wx.upload.min.js"></script>`

## Usage

```html
<script src="js/wx.upload.min.js"></script>
<form method="post" enctype="multipart/form-data">
    
    <wx-upload></wx-upload>
    <button type="submit">Test</button>

</form>
```

## Attributes

- `placeholder` : Replaces "No image chosen" -text.
- `remove` : Show remove button while image is chosen.
- `name` : Name for input.

## Classes

- `has-image` : If image has been chosen.

## Events

- `change` : Triggered when image is set or cleared - File in event's `detail`.

# License

MIT