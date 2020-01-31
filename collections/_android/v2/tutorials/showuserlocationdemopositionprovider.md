---
title: Show the Blue Dot with MapsIndoors - Part 1
parent: tutorials
nav_weight: 4
published: true
date: 2019-09-30
---

> A [newer version]({{ site.url }}/android/v3) of the MapsIndoors SDK for Android is available. The legacy version will not receive new features and will only get critical bugfix and security updates.
{: .mi-warning}

In this tutorial we will show how you can show a blue dot on the map, representing the users location. The position will be served from a mocked positioning provider and displayed on a map in a view controller.

We will start by creating our implementation of a positioning provider.

Create a class `DemoPositionProvider` that implements `PositionProvider`.

```java
public class DemoPositionProvider  implements
        PositionProvider
```

Add some member variables to `DemoPositionProvider`.

* `mPositionUpdateListener`: The listener object
* `isRunning`: A running state boolean flag
* `mLatestPosition`: The latest positioning result
* `mPositionUpdateTimer`: A timer so we can update the position of the user within an time interval

```java
OnPositionUpdateListener mPositionUpdateListener;
boolean isRunning = false;
MPPositionResult mLatestPosition;
MPPositionResult fixedPosition =  new MPPositionResult(
        new Point( 57.05813067, 9.95058065  ),
        0,
        0
);
Timer mPositionUpdateTimer = new Timer();
```

Create a method called `updatePosition`. This will be our "loop" constantly posting a new position to the delegate.

* Check if the provider has a running state
* Assign the `fixedPosition` value to `mLatestPosition`
* Notify the listener by calling `onPositionUpdate` passing the new position as argument

```java
void updatePosition(){
    if(isRunning){
        mLatestPosition = fixedPosition;
        mLatestPosition.setProvider( this );
        if (mPositionUpdateListener != null) {
            mPositionUpdateListener.onPositionUpdate(mLatestPosition);
        }
    }
}
```

Implement the `isPSEnabled` method to check is the Positionning system is working or not, in this case the PS is always working since it's a mocked positioning provider.

```java
@Override
public boolean isPSEnabled() {
    return true ;
}
```

Implement the `startPositioning` method. We set the `running` boolean to true and scheduel the repeating task of updating the user position by calling the updatePosition every 3 seconds.

```java
@Override
public void startPositioning(@Nullable String arg) {
    isRunning = true;
```

Implement the `stopPositioning` method. We set the `running` boolean to false and stop the timer.

```java
@Override
public void stopPositioning(@Nullable String arg) {
    isRunning = false;
    mPositionUpdateTimer.cancel();
}
```

Implement the `isRunning` method. Return the value of `running`.

```java
@Override
public boolean isRunning() {
    return isRunning ;
}
```

In [Part 2](../showuserlocationshowuserlocationfragment) we will create the map fragment that displays the blue dot.

[See the sample in DemoPositionProvider.java](https://github.com/MapsIndoors/MapsIndoorsAndroid-Demo-Samples/blob/master/app/src/main/java/com/mapsindoors/showuserLocation/DemoPositionProvider.java)
