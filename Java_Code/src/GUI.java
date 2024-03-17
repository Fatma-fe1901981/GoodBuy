import java.awt.EventQueue;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.border.EmptyBorder;
import javax.swing.JLabel;
import javax.swing.JComboBox;
import javax.swing.JTextField;
import javax.swing.DefaultComboBoxModel;
import javax.swing.JButton;
import javax.swing.JRadioButton;

public class GUI extends JFrame {

    private JPanel contentPane;
    private JTextField textField;
    private JTextField textField_1;

    private String[] tableOptions = {"AIRPLANE", "AIRPLANE_TYPE"};
    private String[] conditionOptions = {"=", "<", ">", "<=", ">="};
    private String[] attributeOptionsForTable1 = {"ALL", "Airplane_ID", "Total_Number_of_Seats", "Type_Name"};
    private String[] attributeOptionsForTable2 = {"ALL", "Type_Name", "Company", "Max_Seats"};

    private JComboBox<String> tableComboBox;
    private JComboBox<String> conditionComboBox;
    private JComboBox<String> attributeComboBox;  
    private JComboBox<String> conditionComboBox_1;
    private JComboBox<String> attributeComboBox_1;

    public static void main(String[] args) {
        EventQueue.invokeLater(new Runnable() {
            public void run() {
                try {
                    GUI frame = new GUI();
                    frame.setVisible(true);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    public GUI() {
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setBounds(100, 100, 657, 312);
        contentPane = new JPanel();
        contentPane.setBorder(new EmptyBorder(5, 5, 5, 5));

        setContentPane(contentPane);
        contentPane.setLayout(null);

        JLabel lblNewLabel = new JLabel("Select Operation");
        lblNewLabel.setBounds(321, 11, 92, 14);
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

     // Initial attribute list (for Table1)
        attributeComboBox = new JComboBox<>(attributeOptionsForTable1);
        attributeComboBox.setBounds(109, 103, 70, 20);
        contentPane.add(attributeComboBox);

        tableComboBox.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                // Update attribute options based on the selected table
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
        // Action listener for the "Cost" button
        btnNewButton.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                // Create and show the Results_UI frame
                Results_UI resultsFrame = new Results_UI();
                resultsFrame.setVisible(true);
                // Close the current frame
                dispose();
            }
        });

        JButton btnNewButton_1 = new JButton("Add +");
        btnNewButton_1.setBounds(10, 129, 63, 23);
        contentPane.add(btnNewButton_1);

        JLabel lblNewLabel_2_1 = new JLabel("Attribute");
        lblNewLabel_2_1.setEnabled(false);
        lblNewLabel_2_1.setBounds(29, 202, 70, 14);
        contentPane.add(lblNewLabel_2_1);

        conditionComboBox_1 = new JComboBox<>(conditionOptions);  // <-- Renamed to conditionComboBox_1
        conditionComboBox_1.setEnabled(false);
        conditionComboBox_1.setBounds(321, 201, 70, 20);
        contentPane.add(conditionComboBox_1);

        JLabel lblNewLabel_3_1 = new JLabel("Condition");
        lblNewLabel_3_1.setEnabled(false);
        lblNewLabel_3_1.setBounds(220, 202, 70, 14);
        contentPane.add(lblNewLabel_3_1);

        attributeComboBox_1 = new JComboBox<>();  // <-- Renamed to attributeComboBox_1
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

        // Action listener for the "Add" button
        btnNewButton_1.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                // Enable/disable components as needed
                lblNewLabel_2_1.setEnabled(true);
                conditionComboBox_1.setEnabled(true);
                lblNewLabel_3_1.setEnabled(true);
                attributeComboBox_1.setEnabled(true);
                lblNewLabel_4_1.setEnabled(true);
                textField_1.setEnabled(true);
                
                // Update attribute options for attributeComboBox_1 based on the selected table
                String selectedTable = tableComboBox.getSelectedItem().toString();
                updateAttributeOptions(selectedTable, attributeComboBox_1);
            }
        });
    }

 // Method to update attribute options based on the selected table
    private void updateAttributeOptions(String selectedTable, JComboBox<String> attributeComboBox) {
        // Implement your logic to update attribute options based on the selected table
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

