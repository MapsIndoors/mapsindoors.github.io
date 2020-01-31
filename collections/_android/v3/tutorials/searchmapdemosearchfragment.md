---
title: Create a Search Experience with MapsIndoors - Part 1
parent: tutorials
nav_weight: 160
published: true
date: 2019-09-30
---

This is an example of creating a simple search experience using MapsIndoors. We will create a map with a search button that leads to another Fragment that handles the search and selection. On selection of a location, we go back to the map and shows the selected location on the map.

We will start by creating a simple search controller that handles search and selection of MapsIndoors locations

Declare a listener for our location selection with a `onUserSelectedLocation` method

```java
public class SearchFragment extends Fragment {
```

Setup member variables for `SearchFragment`:

* The selection listener
* A List View to show the search result
* Some view components

```java
OnFragmentInteractionListener mListener;
ListView mMainMenuList;
View mMainView;
EditText mSearchEditTextView;
ImageButton mSearchClearBtn;
IconTextListAdapter mListAdapter;
ViewFlipper mViewFlipper;
ImageButton mBackButton;

```java

Init and setup the listView:

```java
mListAdapter = new IconTextListAdapter( getContext(), new ArrayList<>() );
mMainMenuList.setAdapter( mListAdapter );
mMainMenuList.setClickable( true );
mMainMenuList.setOnItemClickListener( mAdapterViewOnItemClickListener );
mMainMenuList.invalidate();
```

Init and setup the view components for a better search experience.

Note: Creating a TextWatcher as it's needed for software keyboard support:

```java
mSearchEditTextView.addTextChangedListener( mEditTextViewTextWatcher );
mSearchEditTextView.setOnFocusChangeListener( mEditTextViewOnFocusChangeListener );
```

Close keyboard and search when user presses search on the keyboard:

```java
mSearchEditTextView.setOnEditorActionListener( mEditTextViewOnEditorActionListener );
```

Close keyboard and search when user presses enter:

```java
mSearchEditTextView.setOnKeyListener( mEditTextOnKeyListener );
```

Clear search button:

```java
mSearchClearBtn.setOnClickListener( mClearSearchButtonClickListener );
mSearchClearBtn.setOnFocusChangeListener( mClearSearchButtonFocusChangeListener );
```

Whenever a user clicks a search result the 'onUserSelectedLocation' of the FragmentInteractionListener is called:

```java
AdapterView.OnItemClickListener mAdapterViewOnItemClickListener = new AdapterView.OnItemClickListener()
{
    @Override
    public void onItemClick( AdapterView<?> parent, View view, int position, long id )
    {
        closeKeyboard();
        if( mListener != null ) {
            mListener.onUserSelectedLocation( (MPLocation) mListAdapter.getItem( position ) );
        }
    }
};

```java
Declare an interface that will handle the communication between the fragment and the activity:

```java
public interface OnFragmentInteractionListener
{
    void onUserSelectedLocation( @Nullable MPLocation loc );
}
@NonNull
public static SearchFragment newInstance()
{
    return new SearchFragment();
}
```

In [Part 2](../searchmapdemosearchmapfragment) we will create the map fragment that displays the search result.

[See the sample in SearchFragment.java](https://github.com/MapsIndoors/MapsIndoorsAndroid-Demo-Samples/blob/master/app/src/main/java/com/mapsindoors/searchmapdemo/SearchFragment.java)
