---
title: Show Location Details
parent: tutorials
nav_weight: 1
published: true
date: 2019-09-30
---

> A [newer version]({{ site.url }}/android/v3) of the MapsIndoors SDK for Android is available. The legacy version will not receive new features and will only get critical bugfix and security updates.
{: .mi-warning}

This is an example of displaying some details of a MapsIndoors location

Start by creating a `Fragment or an Activity` class that contains the Google map fragment

```java
public class LocationDetailsFragment extends Fragment
```

Add a `GoogleMap` and a `MapControl` to the class

```java
MapControl mMapControl;
GoogleMap mGoogleMap;
```

Add other needed views for this example

```java
SupportMapFragment mMapFragment;
TextView detailsTextView;
```

The lat lng of the Venue

```java
static final LatLng VENUE_LAT_LNG = new LatLng( 57.05813067, 9.95058065 );
```

Setup the needed views for this example

```java
private void setupView( View rootView )
{
    FragmentManager fm = getChildFragmentManager();
    detailsTextView = rootView.findViewById( R.id.details_text_view );
    mMapFragment = (SupportMapFragment) fm.findFragmentById( R.id.mapfragment );
    mMapFragment.getMapAsync( mOnMapReadyCallback );
}
```

Once the map is ready move the camera to the venue location and call the setupMapsIndoors

```java
OnMapReadyCallback mOnMapReadyCallback = new OnMapReadyCallback() {
    @Override
    public void onMapReady( GoogleMap googleMap )
    {
        mGoogleMap = googleMap;
        mGoogleMap.moveCamera( CameraUpdateFactory.newLatLngZoom( VENUE_LAT_LNG, 13.0f ) );
        setupMapsIndoors();
    }
};
```

Setup MapsIndoors

```java
void setupMapsIndoors()
{
```

Setting the API key to the desired solution

```java
if( !MapsIndoors.getAPIKey().equalsIgnoreCase( getString( R.string.mi_api_key ) ) )
{
    MapsIndoors.setAPIKey( getString( R.string.mi_api_key ) );
}
```

Setting the Google API key

```java
MapsIndoors.setGoogleAPIKey( getString( R.string.google_maps_key ) );
if( getActivity() == null )
{
    return;
}
```

Instanciate and init the MapControl object which will sync data

```java
mMapControl = new MapControl( getActivity(), mMapFragment, mGoogleMap );
mMapControl.init( miError -> {
    if( getActivity() != null )
    {
        getActivity().runOnUiThread(() -> {
```

Select a floor and animate the camera to the venue position

```java
mMapControl.selectFloor( 1 );
mGoogleMap.animateCamera( CameraUpdateFactory.newLatLngZoom( VENUE_LAT_LNG, 20f ) );
```

When a marker is clicked, get the related MapsIndoors location object and set the label text based on the name and description of the location

```java
mMapControl.setOnMarkerClickListener( marker -> {
    final Location loc = mMapControl.getLocation( marker );
    if( loc != null )
    {
        marker.showInfoWindow();
        if( detailsTextView.getVisibility() != View.VISIBLE )
        {
            detailsTextView.setVisibility( View.VISIBLE );
        }
```

Show the Name and the description of a POI in a label

```java
detailsTextView.setText( "Name: " + loc.getName() + "\nDescription: " + loc.getStringProperty( LocationPropertyNames.DESCRIPTION ) );
rn true;
```

Init the MapControl object which will sync data

```java
mMapControl.init( miError -> {
    if( miError == null )
    {
        Activity context = getActivity();
        if( context != null )
        {
            context.runOnUiThread( () -> {
```

Select a floor and animate the camera to the venue position

```java
mMapControl.selectFloor( 1 );
mGoogleMap.animateCamera( CameraUpdateFactory.newLatLngZoom( VENUE_LAT_LNG, 20f ) );
```

[See the sample in LocationDetailsFragment.java](https://github.com/MapsIndoors/MapsIndoorsAndroid-Demo-Samples/blob/master/app/src/main/java/com/mapsindoors/locationdetailsdemo/LocationDetailsFragment.java)
