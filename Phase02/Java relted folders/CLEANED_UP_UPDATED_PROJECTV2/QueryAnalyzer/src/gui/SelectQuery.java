package gui;

import java.awt.EventQueue;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.ArrayList;
import java.util.List;
import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.border.EmptyBorder;
import javax.swing.JLabel;
import javax.swing.JComboBox;
import javax.swing.JTextField;
import javax.swing.DefaultComboBoxModel;
import javax.swing.JButton;

public class SelectQuery extends JFrame {

	private JPanel contentPane;
	private JTextField textField;
	private JTextField textField_1;

	private String[] tableOptions = { "AIRPLANE", "AIRPLANE_TYPE" };
	private String[] conditionOptions = { "=", "<", ">", "<=", ">=" };
	private String[] attributeOptionsForTable1 = { "Airplane_ID", "Total_Number_of_Seats", "Type_Name" };
	private String[] attributeOptionsForTable2 = { "Type_Name", "Company", "Max_Seats" };

	private JComboBox<String> tableComboBox;
	private JComboBox<String> conditionComboBox;
	private JComboBox<String> attributeComboBox;
	private JComboBox<String> conditionComboBox_1;
	private JComboBox<String> attributeComboBox_1;

	public static void main(String[] args) {
		EventQueue.invokeLater(new Runnable() {
			public void run() {
				try {
					SelectQuery frame = new SelectQuery();
					frame.setVisible(true);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		});
	}

	public SelectQuery() {
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		setBounds(100, 100, 657, 312);
		contentPane = new JPanel();
		contentPane.setBorder(new EmptyBorder(5, 5, 5, 5));

		setContentPane(contentPane);
		contentPane.setLayout(null);

		JLabel lblNewLabel = new JLabel("Select Operation");
		lblNewLabel.setBounds(300, 20, 100, 20);
		contentPane.add(lblNewLabel);

		JLabel lblNewLabel_1 = new JLabel("Table");
		lblNewLabel_1.setBounds(220, 48, 48, 14);
		contentPane.add(lblNewLabel_1);

		tableComboBox = new JComboBox<>(tableOptions);
		tableComboBox.setBounds(296, 47, 124, 20);
		contentPane.add(tableComboBox);

		JLabel lblNewLabel_2 = new JLabel("Attribute");
		lblNewLabel_2.setBounds(29, 104, 70, 14);
		contentPane.add(lblNewLabel_2);

		conditionComboBox = new JComboBox<>(conditionOptions);
		conditionComboBox.setBounds(321, 103, 70, 20);
		contentPane.add(conditionComboBox);

		JLabel lblNewLabel_3 = new JLabel("Condition ");
		lblNewLabel_3.setBounds(220, 104, 70, 14);
		contentPane.add(lblNewLabel_3);

		attributeComboBox = new JComboBox<>(attributeOptionsForTable1);
		attributeComboBox.setBounds(109, 103, 70, 20);
		contentPane.add(attributeComboBox);

		tableComboBox.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				String selectedTable = tableComboBox.getSelectedItem().toString();
				updateAttributeOptions(selectedTable, attributeComboBox);
			}
		});

		JLabel lblNewLabel_4 = new JLabel("Value");
		lblNewLabel_4.setBounds(452, 104, 48, 14);
		contentPane.add(lblNewLabel_4);

		textField = new JTextField();
		textField.setBounds(526, 101, 96, 20);
		contentPane.add(textField);
		textField.setColumns(10);

		JButton btnNewButton = new JButton("Cost");
		btnNewButton.setBounds(296, 243, 89, 23);
		contentPane.add(btnNewButton);
		btnNewButton.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				Cost costsResults = new Cost();
				costsResults.setVisible(true);
		        List<String> selectedData = getSelectedData();
		        System.out.println("Selected Data: " + selectedData);
				dispose();
			}
		});

		JButton btnNewButton_1 = new JButton("Add +");
		btnNewButton_1.setBounds(30, 135, 70, 30);
		contentPane.add(btnNewButton_1);

		JLabel lblNewLabel_2_1 = new JLabel("Attribute");
		lblNewLabel_2_1.setEnabled(false);
		lblNewLabel_2_1.setBounds(29, 202, 70, 14);
		contentPane.add(lblNewLabel_2_1);

		conditionComboBox_1 = new JComboBox<>(conditionOptions); 
		conditionComboBox_1.setEnabled(false);
		conditionComboBox_1.setBounds(321, 201, 70, 20);
		contentPane.add(conditionComboBox_1);

		JLabel lblNewLabel_3_1 = new JLabel("Condition");
		lblNewLabel_3_1.setEnabled(false);
		lblNewLabel_3_1.setBounds(220, 202, 70, 14);
		contentPane.add(lblNewLabel_3_1);

		attributeComboBox_1 = new JComboBox<>(); 
		attributeComboBox_1.setEnabled(false);
		attributeComboBox_1.setBounds(109, 201, 70, 20);
		contentPane.add(attributeComboBox_1);

		JLabel lblNewLabel_4_1 = new JLabel("Value");
		lblNewLabel_4_1.setEnabled(false);
		lblNewLabel_4_1.setBounds(452, 202, 48, 14);
		contentPane.add(lblNewLabel_4_1);

		textField_1 = new JTextField();
		textField_1.setEnabled(false);
		textField_1.setColumns(10);
		textField_1.setBounds(526, 199, 96, 20);
		contentPane.add(textField_1);

		JLabel lblNewLabel_5 = new JLabel("AND");
		lblNewLabel_5.setBounds(331, 163, 48, 14);
		contentPane.add(lblNewLabel_5);

		btnNewButton_1.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				// Enable/disable components as needed
				lblNewLabel_2_1.setEnabled(true);
				conditionComboBox_1.setEnabled(true);
				lblNewLabel_3_1.setEnabled(true);
				attributeComboBox_1.setEnabled(true);
				lblNewLabel_4_1.setEnabled(true);
				textField_1.setEnabled(true);

				String selectedTable = tableComboBox.getSelectedItem().toString();
				updateAttributeOptions(selectedTable, attributeComboBox_1);
			}
		});
	}
    //this method to get the selected data as a List
    public List<String> getSelectedData() {
        List<String> selectedData = new ArrayList<>();
        
        // Get selected table
        String selectedTable = tableComboBox.getSelectedItem().toString();
        selectedData.add(selectedTable);
        
        // Get selected attribute and condition for the first field
        String selectedAttribute = attributeComboBox.getSelectedItem().toString();
        String selectedCondition = conditionComboBox.getSelectedItem().toString();
        String selectedValue = textField.getText();
        selectedData.add(selectedAttribute);
        selectedData.add(selectedCondition);
        selectedData.add(selectedValue);

        // Check if the second field is enabled
        if (attributeComboBox_1.isEnabled()) {
            // Get selected attribute and condition for the second field
            String selectedAttribute2 = attributeComboBox_1.getSelectedItem().toString();
            String selectedCondition2 = conditionComboBox_1.getSelectedItem().toString();
            String selectedValue2 = textField_1.getText();
            selectedData.add(selectedAttribute2);
            selectedData.add(selectedCondition2);
            selectedData.add(selectedValue2);
        }

        return selectedData;
    }
	private void updateAttributeOptions(String selectedTable, JComboBox<String> attributeComboBox) {
		DefaultComboBoxModel<String> model = new DefaultComboBoxModel<>();

		if ("AIRPLANE".equals(selectedTable)) {
			for (String attribute : attributeOptionsForTable1) {
				model.addElement(attribute);
			}
		} else if ("AIRPLANE_TYPE".equals(selectedTable)) {
			for (String attribute : attributeOptionsForTable2) {
				model.addElement(attribute);
			}
		}

		attributeComboBox.setModel(model);
	}

}
