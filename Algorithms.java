package gui;

public class Algorithms {

	public int linearSearchRange (int blockNo) {
		
	return blockNo;
	}
	public int linearSearchEquality (int blockNo) {
		//for an equality condition on a key attribute
		return blockNo/2;
		}
	//insert binary here
	public double primaryIndex(int recordsNo, double selectivity) {
		//for equality only (to retrieve one value)
		return (double)recordsNo * selectivity + 1;
	}
	public int hash(){
		//for one record
		return 1;
	}
	public double orderingIndex(int blockNo, int recordsNo, double selectivity) {
		//multiple records 
		return (double)recordsNo*selectivity +(blockNo/2);
	}
// insert clustering here
	public double secondaryIndexEquality (int recordsNo, double selectivity) {
		//for equality
		return (double)(recordsNo*selectivity)+1+(recordsNo*selectivity);
	}
	public double secondaryIndexRange (int recordsNo, double selectivity ) {
		return (double) (recordsNo*selectivity)+()+(recordsNo/2);
	}
	
	
}
