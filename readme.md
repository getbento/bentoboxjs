## Reservations
Opens a modal with the right Opentable url. 
Only supports Opentable currently.

Any a.reserve link triggers the event that opens the modal.

```
<script type="text/javascript">
$(document).ready(function() {
  Bento.Reservations.initialize();
});
</script>
```

## Forms

All forms on the page get POST to their "action" attribute via ajax.

If successful, div.success inside the form gets displayed. If there is an error, div.error inside the form gets displayed. Html5 form validation works.

```
<script type="text/javascript">
$(document).ready(function() {
  Bento.Forms.initialize();
});
</script>
```

```
<script type="text/javascript">
$(document).ready(function() {
  Bento.Forms.initialize({
    formSelector: '.newsletter-form',
  });
});
</script>
```
