package gui;
import javax.swing.*;
import javax.swing.border.EmptyBorder;
import javax.swing.table.DefaultTableModel;
import java.awt.*;
import java.util.Vector;
import java.util.List;


public class Cost extends JFrame {

    private JPanel contentPane;
    private JTable costFields;
    private JTextField textField;
    private JScrollPane scrollPane;
    private static int flag = WelcomePage.flag;

    public static void main(String[] args) {
        EventQueue.invokeLater(new Runnable() {
            public void run() {
                try {
                    Cost frame = new Cost();
                    frame.setVisible(true);

                    // Call the custom function to perform calculations and update the table
                    frame.performCalculationsAndAddToTable(flag);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    public Cost() {
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setBounds(100, 100, 626, 355);
        contentPane = new JPanel();
        contentPane.setBorder(new EmptyBorder(5, 5, 5, 5));

        setContentPane(contentPane);
        contentPane.setLayout(null);

        scrollPane = new JScrollPane();
        scrollPane.setBounds(40, 132, 543, 166);
        contentPane.add(scrollPane);

        costFields = new JTable();
        costFields.setModel(new DefaultTableModel(
                new Object[][]{},
                new String[]{"Algorithms Used ", "Cost"}
        ));
        costFields.getColumnModel().getColumn(0).setPreferredWidth(119);
        scrollPane.setViewportView(costFields);

        JLabel costPageTitle = new JLabel("Cost Estimation");
        costPageTitle.setFont(new Font("Times New Roman", Font.BOLD, 25));
        costPageTitle.setBounds(210, 35, 189, 40);
        contentPane.add(costPageTitle);

        textField = new JTextField();
        textField.setEditable(false);
        textField.setBounds(128, 101, 445, 20);
        contentPane.add(textField);
        textField.setColumns(10);

        JLabel query = new JLabel("Query");
        query.setFont(new Font("Tahoma", Font.PLAIN, 15));
        query.setBounds(52, 101, 48, 17);
        contentPane.add(query);
    }

    private void updateTableWithValues(String algorithm, double cost) {
        DefaultTableModel model = (DefaultTableModel) costFields.getModel();
        Vector<Object> row = new Vector<>();
        row.add(algorithm);
        row.add(cost);
        model.addRow(row);
    }

    private void performCalculationsAndAddToTable(int flag) {
    	if (flag == 0){
    		// here get the related values for calculating the join from the metadata in sql 
    		// Calling the join algorithms here
    		double result_1 = Functions.Indexed_Nested_loop_join(flag, flag, flag, flag, flag, flag, flag);
    		String algoName="Indexed Nested loop join algorithm";
    		// Call the function to update the table
            updateTableWithValues(algoName, result_1);
    		// Calling the second join algorithms here
    		double result_2 = Functions.Nested_loop_join(flag, flag, flag, flag, flag, flag, flag);
    		String algoName2="Nested loop join algorithm";
    		// Call the function to update the table
            updateTableWithValues(algoName2, result_2);
            
            
    		
    	}
    	else if(flag == 1){
    		// start checking what type in select 
    		//get the list here 
    		 SelectQuery selectQuery = new SelectQuery();
             List<String> selectedData = selectQuery.getSelectedData();
             
             //this means we are getting the attrbuite the table is ordered on 
             if ("AIRPLANE_TYPE".equals(selectedData.get(0))&& "Type_Name".equalsIgnoreCase(selectedData.get(1))) {
        		// here get the related values for calculating the select from the metadata in sql 
        		// Calling the select algorithms here
            	 double result1 =Functions.binarySearch(flag, flag, flag);
            	 String algoName = "Binary Search Algorithm";
                // Call the function to update the table
        		updateTableWithValues(algoName, result1);	
    		}
//    		else if () {
//        		// here get the related values for calculating the select from the metadata in sql 
//        		// Calling the select algorithms here
//                // Call the function to update the table
//        		// updateTableWithValues(algorithm, calculatedValue);	
//    		}
//    		else if () {
//        		// here get the related values for calculating the select from the metadata in sql 
//        		// Calling the select algorithms here
//                // Call the function to update the table
//        		// updateTableWithValues(algorithm, calculatedValue);	
//    		}
//    		// here get the related values for calculating the select from the metadata in sql 
//    		// Calling the select algorithms here
//            // Call the function to update the table
//    		// updateTableWithValues(algorithm, calculatedValue);
    		
    	}

    }
}
